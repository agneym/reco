import { html } from "htm/preact";
import { useMemo, useEffect } from "preact/hooks";
import { createRef } from "preact";

const convertWorker = new Worker(
  "../node_modules/ffmpeg.js/ffmpeg-worker-mp4.js"
);

/**
 * @component Component to be rendered after recording.
 */
function After({ recording }) {
  const linkRef = createRef();

  const webmUrl = useMemo(() => {
    return URL.createObjectURL(recording);
  }, [recording]);

  useEffect(() => {
    const setToLink = (blob) => {
      const linkEl = linkRef.current;
      const url = window.URL.createObjectURL(blob);
      linkEl.href = url;
    };
    const onFileReady = (message) => {
      const out = message.data.MEMFS[0];
      const linkEl = linkRef.current;
      if (out && linkEl) {
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
      <a
        download="screen-recording.mp4"
        class="shadow rounded-sm px-8 py-2 bg-teal-600 hover:bg-teal-700"
        ref=${linkRef}
        >Download MP4</a
      >
    </div>
  `;
}

export default After;
