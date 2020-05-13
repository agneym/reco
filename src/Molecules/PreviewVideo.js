import { html } from "htm/preact";
import { useRef, useMemo } from "preact/hooks";
import { Range } from "rc-slider";

function PreviewVideo({ url }) {
  const videoEl = useRef(null);

  const duration = useMemo(() => {
    if (videoEl.current) {
      console.log(videoEl.current);
      return videoEl.current.duration;
    }
    return 1;
  }, [videoEl.current]);

  return html`
    <video class="max-w-xl" controls autoplay src=${url} ref=${videoEl} />
    <div class="mt-6">
      <h2 class="text-base font-medium block mb-1">Trim Video :</h2>
      <${Range} min=${1} max=${duration} />
    </div>
  `;
}

export default PreviewVideo;
