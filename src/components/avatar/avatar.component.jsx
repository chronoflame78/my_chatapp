import React from "react";

const Avatar = ({ imageUrl, size, className }) => {
  return (
    <div
      className={`avatar-cover ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        style={{
          objectFit: "cover",
          height: "100%",
          width: "100%",
          borderRadius: "50%",
        }}
        src={imageUrl}
        alt=""
      />
    </div>
  );
};

export default Avatar;