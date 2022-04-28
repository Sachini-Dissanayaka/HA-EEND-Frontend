import React, { FC, useState } from "react";
import { Typography, Upload, message, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import Result from "../components/Result";
import Player from "../components/Player";
import Loading from "../components/Loading";

const { Title } = Typography;

const Home: FC = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [options, setOptions] = useState();
  // const [currentSeek, setCurrentSeek] = useState(10);

  const handleFileSelect = (file: File) => {
    const isWav = file.type === "audio/wav";
    if (!isWav) {
      message.error(`${file.name} is not a wav file`);
      return;
    }
    setFile(file);
    return false;
  };

  const handleFileRemove = () => {
    setFile(undefined);
  };

  const handleUpload = async () => {
    const body = new FormData();
    if (file) body.append("wavFile", file);

    setLoading(true);

    try {
      const rawResponse = await fetch("http://34.125.134.121:3000/ha-eend", {
        method: "POST",
        body,
      });

      if (rawResponse.ok) {
        const response = await rawResponse.json();

        const s1Points = [];
        const s2Points = [];
        for (let i = 0; i < response.speaker1.length; i++) {
          s1Points.push({ x: i + 1, y: +response.speaker1[i] });
          s2Points.push({ x: i + 1, y: +response.speaker2[i] });
        }

        const opt = {
          speaker1: {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Speaker 1",
            },
            data: [
              {
                type: "stepLine",
                markerSize: 0,
                lineColor: "blue",
                dataPoints: s1Points,
              },
            ],
          },
          speaker2: {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Speaker 2",
            },
            data: [
              {
                type: "stepLine",
                markerSize: 0,
                lineColor: "red",
                dataPoints: s2Points,
              },
            ],
          },
          overlaps: {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Overlaps",
            },
            data: [
              {
                type: "stepArea",
                markerSize: 0,
                lineThickness: 0,
                color: "blue",
                dataPoints: s1Points,
              },
              {
                type: "stepArea",
                markerSize: 0,
                lineThickness: 0,
                line: 0,
                color: "red",
                dataPoints: s2Points,
              },
            ],
          },
        };
        console.log(opt);
        setOptions(opt as any);
      } else {
        throw new Error();
      }
    } catch (e) {
      message.error(`Something went wrong ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleProgress = (info: any) => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "80px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image src={process.env.PUBLIC_URL + "/mora_logo.png"} width={120} />
        <div style={{ width: "1200px" }} />
        <Image src={process.env.PUBLIC_URL + "/cse_logo.jpeg"} width={120} />
      </div>
      <Title>Welcome to HA-EEND Speaker Diarization</Title>
      <Upload
        beforeUpload={handleFileSelect}
        onRemove={handleFileRemove}
        maxCount={1}
        accept=".wav"
      >
        <Button icon={<UploadOutlined />}>Select File (*.wav)</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file}
        loading={loading}
        style={{ marginTop: 16 }}
      >
        {loading ? "Loading" : "Analyze"}
      </Button>
      {file && <Player file={file} onProgress={handleProgress} />}
      {loading && <Loading />}
      {options && <Result options={options} />}
    </div>
  );
};

export default Home;
