import { html } from "htm/preact";

import DownloadBtn from "../Molecules/DownloadBtn.js";
import useConverter from "../hooks/useConverter.js";

/**
 * @component Component to be rendered after recording.
 */
function After({ recording, restart }) {
  const { webmUrl, mp4Url } = useConverter(recording);

  return html`
    <div class="text-center">
      <video class="max-w-xl m-6" controls autoplay src=${webmUrl} />
      <${DownloadBtn} href=${webmUrl}>
        Download WebM
      </${DownloadBtn}>
      <${DownloadBtn} href=${mp4Url}>
        Download MP4
      </${DownloadBtn}>
      <div class="">
        <button class="bg-pink-600 m-5 px-8 py-4 text-white hover:bg-pink-700" onClick=${restart}>Restart Recording</button>
      </div>
    </div>
  `;
}

export default After;
