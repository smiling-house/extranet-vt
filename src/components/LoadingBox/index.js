import React from "react";
import './LoadingBox.scss';

const LoadingBox = (props) => {
  const { visible, className = "", style } = props;

  if (visible) {
    return (
      <div className={`loading-box ${className}`.trim()} style={style}>
        <div className="loading-spinner-navy" />
      </div>
    );
  }

  return null;
};

export default LoadingBox;
