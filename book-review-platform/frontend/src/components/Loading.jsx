import React from 'react';

const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  const sizes = {
    small: { width: '24px', height: '24px', border: '3px' },
    medium: { width: '50px', height: '50px', border: '5px' },
    large: { width: '80px', height: '80px', border: '6px' }
  };

  const dimensions = sizes[size] || sizes.medium;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      minHeight: size === 'large' ? '400px' : 'auto'
    }}>
      <div style={{
        width: dimensions.width,
        height: dimensions.height,
        border: `${dimensions.border} solid #f3f3f3`,
        borderTop: `${dimensions.border} solid #0984e3`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{
        marginTop: '20px',
        color: '#666',
        fontSize: size === 'small' ? '14px' : '16px'
      }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
