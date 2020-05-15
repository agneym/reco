import { useMemo, useCallback } from "preact/hooks";
import FileSaver from "file-saver";

import pad from "../utils/pad.js";

const convertWorker = new Worker("/public/ffmpeg-worker-mp4.js");

function getDateTime(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return pad`${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`;
}

/**
 * Convert recording into different formats.
 * @param {Blob} recording Recording to be converted
 */
function useConverter(recording) {
  const webmUrl = useMemo(() => {
    return window.URL.createObjectURL(recording);
  }, [recording]);

  const onFileReady = (message) => {
    const out = message.data.MEMFS[0];
    if (out) {
      const blob = new Blob([out.data], {
        type: "video/mp4",
      });
      FileSaver.saveAs(blob, `Reco - ${getDateTime()}.mp4`);
    }
  };

  const convert = useCallback(
    ([start, end]) => {
      const handleMessage = (e) => {
        const message = e.data;
        switch (message.type) {
          case "done": {
            onFileReady(message);
            convertWorker.removeEventListener("message", handleMessage);
            break;
          }
        }
      };
      const convert = async () => {
        const buffer = await recording.arrayBuffer();
        convertWorker.postMessage({
          type: "run",
          MEMFS: [{ name: "test.webm", data: buffer }],
          arguments: `-ss ${start} -y -i test.webm -c:v copy -to ${end} screen-recording.mp4`.split(
            " "
          ),
        });
      };

      convert();
      convertWorker.addEventListener("message", handleMessage);

      return () => {
        convertWorker.removeEventListener("message", handleMessage);
      };
    },
    [recording]
  );

  return {
    webmUrl,
    convert,
  };
}

export default useConverter;
