import React from 'react';
import '../styles.css';

const ContentContainer = ({ children }) => {
  return (
    <div className="content-container">
      {children}
    </div>
  );
};

export default ContentContainer;
