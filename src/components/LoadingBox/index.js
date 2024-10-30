import React from "react";
import './LoadingBox.scss';
import loadingImage from '../../assets/icons/loading_ajax.gif'; // Import the loading image

const LoadingBox = (props) => {
  const { visible } = props;

  if (visible) {
    return (
      <div className="loading-box">
        <img className="loading-image" src={loadingImage} alt="Loading" /> {/* Add the loading image */}
      </div>
    );
  }

  return null;
};

export default LoadingBox;
