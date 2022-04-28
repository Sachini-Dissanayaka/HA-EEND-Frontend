import React, { FC } from "react";
import ReactPlayer from "react-player/file";

type PlayerProps = {
  file: File;
  onProgress: (state: { played: number }) => void;
};

const Player: FC<PlayerProps> = ({ file, onProgress }) => {
  return (
    <>
      <ReactPlayer
        height="80px"
        width="1800px"
        controls
        url={URL.createObjectURL(file)}
        onProgress={onProgress}
        onError={(e) => console.error(e)}
      />
    </>
  );
};

export default Player;
