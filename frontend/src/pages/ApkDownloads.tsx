import { useState } from 'react';
import { ArrowDownTrayIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface ApkInfo {
  id: string;
  name: string;
  version: string;
  size: string;
  description: string;
  file: string;
  releaseDate: string;
  requirements: string;
  iconUrl: string;
}

const ApkDownloads = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Single APK file information
  const apkInfo: ApkInfo = {
    id: '1',
    name: 'RuralSTEM Labs',
    version: '1.0.0',
    size: '24.5 MB',
    description: 'Official RuralSTEM Labs mobile application. Access STEM learning resources designed for rural students, including virtual labs, interactive tutorials, and educational simulations. Our app brings science and technology education to rural areas with limited resources.',
    file: '/downloads/apk/stemlabs/app-release.apk',
    releaseDate: '2023-10-15',
    requirements: 'Android 6.0+',
    iconUrl: '/downloads/apk/icons/ruralstem_labs.svg'
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ 
      paddingTop: '72px',
      paddingBottom: '64px',
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      color: 'var(--text)'
    }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', padding: '64px 0 48px' }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.1))',
          zIndex: 0
        }} />
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 16px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ 
            textAlign: 'center', 
            maxWidth: '800px',
            margin: '0 auto' 
          }}>
            <h1 style={{ 
              fontSize: '36px',
              fontWeight: 'bold',
              marginBottom: '16px',
              backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              APK Download
            </h1>
            <p style={{ 
              fontSize: '18px',
              color: 'var(--text-muted)',
              marginBottom: '24px',
            }}>
              Download our official Android application
            </p>
          </div>
        </div>
      </section>

      {/* APK Card */}
      <section style={{ 
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: 'var(--background-lighter)',
          border: '1px solid var(--border)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          position: 'relative',
          marginTop: '32px',
        }}
        className="glass-card hover:shadow-xl"
        >
          <div style={{ padding: '32px' }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
              gap: '24px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img 
                  src={apkInfo.iconUrl} 
                  alt={apkInfo.name}
                  style={{ width: '50px', height: '50px' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to placeholder
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2I4MmY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYXBwLXdpbmRvdyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB4PSIzIiB5PSIzIiByeD0iMiIvPjxwYXRoIGQ9Ik04IDNWN0g2Ii8+PHBhdGggZD0iTTYgMjFWMTYgTTYgMTJWMTEiLz48cGF0aCBkPSJtOSAxNSA2LTYiLz48cGF0aCBkPSJNMTUgMTUgOSA5Ii8+PC9zdmc+';
                  }}
                />
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--text)'
                }}>
                  {apkInfo.name}
                </h3>
                <div style={{ 
                  display: 'flex',
                  gap: '8px',
                  fontSize: '14px',
                  color: 'var(--text-muted)'
                }}>
                  <span>v{apkInfo.version}</span>
                  <span>•</span>
                  <span>{apkInfo.size}</span>
                  <span>•</span>
                  <span>{apkInfo.requirements}</span>
                </div>
              </div>
            </div>
            
            <p style={{ 
              fontSize: '16px',
              color: 'var(--text-muted)',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}>
              {apkInfo.description}
            </p>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px'
            }}>
              <button
                onClick={openModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  borderRadius: '8px',
                  fontWeight: '500',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                <InformationCircleIcon style={{ width: '20px', height: '20px' }} />
                Installation Guide
              </button>
              
              <a
                href={apkInfo.file}
                download
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ArrowDownTrayIcon style={{ width: '20px', height: '20px' }} />
                Download StemLabs APK
              </a>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '48px',
          backgroundColor: 'var(--background-lighter)',
          borderRadius: '12px',
          padding: '32px',
          border: '1px solid var(--border)'
        }}
        className="glass-card"
        >
          <h3 style={{ 
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: 'var(--text)'
          }}>
            StemLabs APK Download
          </h3>
          <p style={{ 
            fontSize: '14px',
            color: 'var(--text-muted)',
            marginBottom: '24px'
          }}>
            Our official StemLabs app provides direct access to virtual STEM experiments and learning resources. Scan the QR code to download directly to your device.
          </p>
          <div style={{
            width: '180px',
            height: '180px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* QR Code for app-release.apk - Placeholder */}
            <div style={{
              width: '148px',
              height: '148px',
              backgroundImage: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              borderRadius: '4px',
              padding: '8px',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              <div>STEM<br/>LABS<br/>APK</div>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <a
              href={apkInfo.file}
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: '500',
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '8px',
              }}
            >
              <ArrowDownTrayIcon style={{ width: '16px', height: '16px' }} />
              Download StemLabs APK
            </a>
          </div>
        </div>
      </section>

      {/* Modal for installation instructions */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '16px',
        }}
        onClick={closeModal}
        >
          <div 
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '16px',
              backgroundColor: 'var(--background)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'var(--text)',
              }}>
                StemLabs APK Installation Guide
              </h2>
              
              <button
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  color: 'var(--text-muted)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div style={{ padding: '24px', maxHeight: '400px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: 'var(--text)'
                }}>Installation Instructions</h3>
                <ol style={{ 
                  paddingLeft: '20px',
                  color: 'var(--text-muted)',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}>
                  <li>Download the StemLabs APK file by clicking the download button.</li>
                  <li>On your Android device, go to Settings &gt; Security.</li>
                  <li>Enable "Unknown Sources" to allow installation of apps from sources other than the Play Store.</li>
                  <li>Open your file manager and locate the downloaded APK file.</li>
                  <li>Tap the APK file to begin installation.</li>
                  <li>Follow the on-screen instructions to complete installation.</li>
                </ol>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: 'var(--text)'
                }}>Permissions Required</h3>
                <ul style={{ 
                  paddingLeft: '20px',
                  color: 'var(--text-muted)',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}>
                  <li>Storage: To save app data and downloaded resources</li>
                  <li>Internet: For accessing online educational content</li>
                  <li>Camera: For AR features in virtual labs</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: 'var(--text)'
                }}>System Requirements</h3>
                <ul style={{ 
                  paddingLeft: '20px',
                  color: 'var(--text-muted)',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}>
                  <li>Android 6.0 (Marshmallow) or higher</li>
                  <li>At least 2GB of RAM</li>
                  <li>100MB of free storage space</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: 'var(--text)'
                }}>Troubleshooting</h3>
                <p style={{ 
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: 'var(--text-muted)',
                  marginBottom: '12px'
                }}>
                  If you encounter any issues during installation:
                </p>
                <ul style={{ 
                  paddingLeft: '20px',
                  color: 'var(--text-muted)',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}>
                  <li>Ensure you have sufficient storage space</li>
                  <li>Check that you've enabled installation from unknown sources</li>
                  <li>If the app won't open, try restarting your device</li>
                  <li>Contact support at support@ruralstem.org for assistance</li>
                </ul>
              </div>
            </div>
            
            <div style={{ 
              padding: '16px 24px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '16px'
            }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--background-lighter)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
              
              <a
                href={apkInfo.file}
                download
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ArrowDownTrayIcon style={{ width: '16px', height: '16px' }} />
                Download StemLabs APK
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApkDownloads; 