import React, { FC } from "react";
import ContentLoader from "react-content-loader";

const Loading: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={1600}
      height={2000}
      backgroundColor="#c9c9c9"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="100" rx="0" ry="0" width="1600" height="300" />
      <rect x="0" y="440" rx="0" ry="0" width="1600" height="300" />
      <rect x="0" y="780" rx="0" ry="0" width="1600" height="300" />
    </ContentLoader>
  );
};

export default Loading;
