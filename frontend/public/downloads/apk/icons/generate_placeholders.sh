#!/bin/bash

# Create placeholder SVG icons for the APK apps

# RuralSTEM Labs icon
cat > ruralstem_labs.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect width="18" height="18" x="3" y="3" rx="2"/>
  <path d="M7 3v4"/>
  <path d="M17 3v4"/>
  <path d="M3 11h18"/>
  <path d="M11 15h1"/>
  <path d="M12 15v3"/>
</svg>
EOF

# Physics Simulator icon
cat > physics_simulator.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M4.93 4.93l2.83 2.83"/>
  <path d="M16.24 16.24l2.83 2.83"/>
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M4.93 19.07l2.83-2.83"/>
  <path d="M16.24 7.76l2.83-2.83"/>
</svg>
EOF

# Chemistry Lab icon
cat > chemistry_lab.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9.5 2v6h-2L7 17a5 5 0 0 0 10 0l-.5-9h-2V2"/>
  <path d="M8 2h8"/>
  <path d="M11 15h2"/>
</svg>
EOF

# Math Practice icon
cat > math_practice.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16 3h4v4"/>
  <path d="M20 3l-5 5"/>
  <path d="M4 20 15 9"/>
  <path d="M4 10V4h6"/>
  <path d="M4 14h4"/>
  <path d="M14 20h6v-6"/>
</svg>
EOF

# Coding Tutorial icon
cat > coding_tutorial.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="16 18 22 12 16 6"/>
  <polyline points="8 6 2 12 8 18"/>
</svg>
EOF

# Convert SVG to PNG if ImageMagick is available
if command -v convert >/dev/null 2>&1; then
  echo "Converting SVG to PNG using ImageMagick..."
  for svg in *.svg; do
    png="${svg%.svg}.png"
    convert "$svg" -resize 192x192 "$png"
    echo "Created $png"
  done
else
  echo "ImageMagick not found. SVG files created, but not converted to PNG."
  echo "Please convert the SVG files to PNG manually."
fi 