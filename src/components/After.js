import { html } from "htm/preact";
import { useMemo } from "preact/hooks";

/**
 * @component Component to be rendered after recording.
 */
function After({ recording }) {
  const webmUrl = useMemo(() => {
    return URL.createObjectURL(recording);
  }, [recording]);
  return html`
    <div>
      <video class="max-w-xl" controls autoplay src=${webmUrl} />
      <a
        download="screen-recording.mp4"
        class="shadow rounded-sm px-8 py-2 bg-teal-600 hover:bg-teal-700"
        >Download MP4</a
      >
    </div>
  `;
}

export default After;
