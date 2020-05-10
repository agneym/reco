import { html } from "htm/preact";

import DownloadBtn from "../Molecules/DownloadBtn.js";
import useConverter from "../hooks/useConverter.js";

/**
 * @component Component to be rendered after recording.
 */
function After({ recording, restart }) {
  const { mp4Url } = useConverter(recording);

  return html`
    <div class="text-center">
      <video class="max-w-xl m-6" controls autoplay src=${mp4Url} />
      <${DownloadBtn} href=${mp4Url}>
        Export video
      </${DownloadBtn}>
      <div class="">
        <button class="bg-pink-600 m-8 px-8 py-4 text-white hover:bg-pink-700" onClick=${restart}>Restart Recording</button>
      </div>
    </div>
  `;
}

export default After;
