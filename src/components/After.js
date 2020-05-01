import { html } from "htm/preact";
import { useMemo, useEffect, useState } from "preact/hooks";

import DownloadBtn from "../Atoms/DownloadBtn.js";

const convertWorker = new Worker(
  "../node_modules/ffmpeg.js/ffmpeg-worker-mp4.js"
);

/**
 * @component Component to be rendered after recording.
 */
function After({ recording }) {
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

  return html`
    <div>
      <video class="max-w-xl" controls autoplay src=${webmUrl} />
      <${DownloadBtn} href=${webmUrl}>
        Download WebM
      </${DownloadBtn}>
      <${DownloadBtn} href=${mp4Url}>
        Download MP4
      </${DownloadBtn}>
    </div>
  `;
}

export default After;
