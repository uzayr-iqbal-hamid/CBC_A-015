import React, { Suspense } from 'react';

// Lazy load the Virtual Labs App
const VirtualLabApp = React.lazy(() => import('../virtuallab/App'));

const VirtualLabs: React.FC = () => {
  return (
    <Suspense fallback={<div style={{textAlign: 'center', marginTop: 40}}>Loading Virtual Labs...</div>}>
      <VirtualLabApp />
    </Suspense>
  );
};

export default VirtualLabs; 