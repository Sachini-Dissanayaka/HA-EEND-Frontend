import React, { FC } from "react";
import CanvasJSReact from "../assets/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

type ResultProps = {
  options: {
    speaker1: any;
    speaker2: any;
    overlaps: any;
  };
};

const Result: FC<ResultProps> = ({ options }) => {
  return (
    <div style={{ width: "1600px" }}>
      <div style={{ margin: "40px 0" }}>
        <CanvasJSChart options={options.speaker1} />
      </div>
      <div style={{ margin: "40px 0" }}>
        <CanvasJSChart options={options.speaker2} />
      </div>
      <div style={{ margin: "40px 0" }}>
        <CanvasJSChart options={options.overlaps} />
      </div>
    </div>
  );
};

export default Result;
