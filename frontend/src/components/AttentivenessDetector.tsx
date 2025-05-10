import React, { useEffect, useRef, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

interface AttentivenessDetectorProps {
  isActive: boolean;
  onInattentiveEvent?: () => void;
  onSessionEnd?: () => void;
}

// Constants for attentiveness detection
const ATTENTIVENESS_THRESHOLDS = {
  EAR_THRESHOLD: 0.22, // Eye Aspect Ratio threshold
  HEAD_POSE_THRESHOLD: 25, // Maximum allowed deviation in degrees
  FRAME_BUFFER_SIZE: 30, // Number of frames to consider for temporal smoothing
  INATTENTIVE_FRAME_THRESHOLD: 20, // Minimum number of inattentive frames to trigger count
  INATTENTIVE_EVENT_THRESHOLD: 10, // Number of inattentive events before reminder
  REMINDER_COOLDOWN: 180000, // 3 minutes in milliseconds
};

const AttentivenessDetector: React.FC<AttentivenessDetectorProps> = ({ 
  isActive, 
  onInattentiveEvent,
  onSessionEnd 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  
  // Refs for maintaining state between renders
  const inattentiveCountRef = useRef<number>(0);
  const lastReminderTimeRef = useRef<number>(0);
  const frameBufferRef = useRef<boolean[]>([]);
  const debugValuesRef = useRef<{ ear: number; headPose: { x: number; y: number } }>({
    ear: 0,
    headPose: { x: 0, y: 0 }
  });

  useEffect(() => {
    if (!isActive || !videoRef.current || !canvasRef.current) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults((results) => {
      if (!canvasRef.current || !videoRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video frame
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          // Calculate attentiveness with temporal smoothing
          const isAttentiveNow = calculateAttentiveness(landmarks);
          
          // Update frame buffer
          frameBufferRef.current.push(isAttentiveNow);
          if (frameBufferRef.current.length > ATTENTIVENESS_THRESHOLDS.FRAME_BUFFER_SIZE) {
            frameBufferRef.current.shift();
          }

          // Count inattentive frames only if we have enough samples
          if (frameBufferRef.current.length === ATTENTIVENESS_THRESHOLDS.FRAME_BUFFER_SIZE) {
            const inattentiveFrames = frameBufferRef.current.filter(frame => !frame).length;
            
            if (inattentiveFrames >= ATTENTIVENESS_THRESHOLDS.INATTENTIVE_FRAME_THRESHOLD) {
              inattentiveCountRef.current++;
              
              // Check if we should trigger a reminder
              const now = Date.now();
              if (inattentiveCountRef.current >= ATTENTIVENESS_THRESHOLDS.INATTENTIVE_EVENT_THRESHOLD && 
                  now - lastReminderTimeRef.current > ATTENTIVENESS_THRESHOLDS.REMINDER_COOLDOWN) {
                onInattentiveEvent?.();
                lastReminderTimeRef.current = now;
                inattentiveCountRef.current = 0;
              }
            }
          }

          // Debug logging in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Attentiveness Metrics:', {
              ear: debugValuesRef.current.ear,
              headPose: debugValuesRef.current.headPose,
              isAttentive: isAttentiveNow,
              inattentiveFrames: frameBufferRef.current.filter(frame => !frame).length
            });
          }
        }
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await faceMesh.send({ image: videoRef.current });
        }
      },
      width: 320,
      height: 240
    });

    camera.start();
    setIsCameraActive(true);

    return () => {
      camera.stop();
      setIsCameraActive(false);
      inattentiveCountRef.current = 0;
      lastReminderTimeRef.current = 0;
      frameBufferRef.current = [];
    };
  }, [isActive, onInattentiveEvent]);

  /**
   * Calculates attentiveness based on eye aspect ratio and head pose
   * @param landmarks Face mesh landmarks from MediaPipe
   * @returns boolean indicating if the user is attentive
   */
  const calculateAttentiveness = (landmarks: any): boolean => {
    // Calculate eye aspect ratio (EAR)
    const leftEye = calculateEAR(landmarks, [33, 160, 158, 133, 153, 144]);
    const rightEye = calculateEAR(landmarks, [362, 385, 387, 263, 373, 380]);
    const ear = (leftEye + rightEye) / 2;
    debugValuesRef.current.ear = ear;

    // Calculate head pose
    const headPose = calculateHeadPose(landmarks);
    debugValuesRef.current.headPose = headPose;

    // Determine if attentive based on thresholds
    return ear > ATTENTIVENESS_THRESHOLDS.EAR_THRESHOLD && 
           Math.abs(headPose.x) < ATTENTIVENESS_THRESHOLDS.HEAD_POSE_THRESHOLD && 
           Math.abs(headPose.y) < ATTENTIVENESS_THRESHOLDS.HEAD_POSE_THRESHOLD;
  };

  /**
   * Calculates Eye Aspect Ratio (EAR) for a single eye
   * @param landmarks Face mesh landmarks
   * @param eyeIndices Indices of the eye landmarks
   * @returns EAR value
   */
  const calculateEAR = (landmarks: any, eyeIndices: number[]): number => {
    const [p1, p2, p3, p4, p5, p6] = eyeIndices.map(i => ({
      x: landmarks[i].x,
      y: landmarks[i].y
    }));

    // Calculate vertical distances
    const A = distance(p2, p6);
    const B = distance(p3, p5);
    // Calculate horizontal distance
    const C = distance(p1, p4);
    
    // EAR = (vertical distances) / (2 * horizontal distance)
    return (A + B) / (2.0 * C);
  };

  /**
   * Calculates head pose using multiple facial landmarks
   * @param landmarks Face mesh landmarks
   * @returns Object containing x (yaw) and y (pitch) angles
   */
  const calculateHeadPose = (landmarks: any) => {
    // Key facial landmarks for head pose estimation
    const nose = landmarks[1];      // Nose tip
    const forehead = landmarks[10]; // Forehead
    const leftCheek = landmarks[234]; // Left cheek
    const rightCheek = landmarks[454]; // Right cheek

    // Calculate yaw (x-axis rotation) using cheek points
    const yaw = Math.atan2(
      rightCheek.x - leftCheek.x,
      rightCheek.y - leftCheek.y
    ) * (180 / Math.PI);

    // Calculate pitch (y-axis rotation) using nose and forehead
    const pitch = Math.atan2(
      nose.y - forehead.y,
      nose.x - forehead.x
    ) * (180 / Math.PI);

    return {
      x: yaw,
      y: pitch
    };
  };

  const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }): number => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  if (!isActive) return null;

  return (
    <div className="fixed bottom-4 right-4 w-40 h-30 rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-black">
      <video
        ref={videoRef}
        className="hidden"
        width="320"
        height="240"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width="320"
        height="240"
      />
      {!isCameraActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs">
          Camera access required
        </div>
      )}
    </div>
  );
};

export default AttentivenessDetector; 