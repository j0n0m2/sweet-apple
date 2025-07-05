import React from "react";

const ImageContainer = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <div
      ref={ref}
      className="absolute w-[600px] h-[600px] overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    ></div>
  );
});

export default ImageContainer;
