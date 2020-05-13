import { html } from "htm/preact";

import DownloadBtn from "../Molecules/DownloadBtn.js";
import useConverter from "../hooks/useConverter.js";
import PrimaryBtn from "../Molecules/PrimaryBtn.js";

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
      <div class="mt-8">
        <${PrimaryBtn} onClick=${restart}>Restart Recording</${PrimaryBtn}>
      </div>
    </div>
  `;
}

export default After;
