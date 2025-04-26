import React from 'react';

interface IconBlockProps {
  icon: React.ReactNode;
  color?: string;
  backgroundColor?: string;
}

const IconBlock: React.FC<IconBlockProps> = ({
  icon,
  color = 'var(--primary-light)',
  backgroundColor = 'rgba(99, 102, 241, 0.15)'
}) => {
  return (
    <div style={{
      backgroundColor,
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '20px',
      width: 'fit-content',
      color,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {icon}
    </div>
  );
};

export default IconBlock; 