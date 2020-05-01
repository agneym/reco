import { useMemo, useEffect, useState } from "preact/hooks";

const convertWorker = new Worker(
  "../node_modules/ffmpeg.js/ffmpeg-worker-mp4.js"
);

/**
 * Convert recording into different formats.
 * @param {Blob} recording Recording to be converted
 */
function useConverter(recording) {
  const webmUrl = useMemo(() => {
    return URL.createObjectURL(recording);
  }, [recording]);

  const [mp4Url, setMp4Url] = useState(null);

  useEffect(() => {
    const setToLink = (blob) => {
      const url = window.URL.createObjectURL(blob);
      setMp4Url(url);
    };
    const onFileReady = (message) => {
      const out = message.data.MEMFS[0];
      if (out) {
        const blob = new Blob([out.data], {
          type: "video/mp4",
        });
        setToLink(blob);
      }
    };
    const handleMessage = (e) => {
      const message = e.data;
      switch (message.type) {
        case "done": {
          onFileReady(message);
          break;
        }
      }
    };
    const convert = async () => {
      const buffer = await recording.arrayBuffer();
      convertWorker.postMessage({
        type: "run",
        MEMFS: [{ name: "test.webm", data: buffer }],
        arguments: [
          "-y",
          "-i",
          "test.webm",
          "-c:v",
          "copy",
          "screen-recording.mp4",
        ],
      });
    };

    convert();
    convertWorker.addEventListener("message", handleMessage);

    return () => {
      convertWorker.removeEventListener("message", handleMessage);
    };
  }, [recording]);

  return {
    mp4Url,
    webmUrl,
  };
}

export default useConverter;
