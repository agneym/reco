import { useMemo, useState, useCallback } from "preact/hooks";

const convertWorker = new Worker("ffmpeg-worker-mp4.js");

/**
 * Convert recording into different formats.
 * @param {Blob} recording Recording to be converted
 */
function useConverter(recording) {
  const [mp4Blob, setMp4Blob] = useState(null);

  const webmUrl = useMemo(() => {
    return window.URL.createObjectURL(recording);
  }, [recording]);

  const onFileReady = (message) => {
    const out = message.data.MEMFS[0];
    if (out) {
      const blob = new Blob([out.data], {
        type: "video/mp4",
      });
      setMp4Blob(blob);
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

  const mp4Url = useMemo(() => {
    if (mp4Blob) {
      return window.URL.createObjectURL(mp4Blob);
    }
    return null;
  }, [mp4Blob]);

  return {
    mp4Url,
    webmUrl,
    convert,
  };
}

export default useConverter;
