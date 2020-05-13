import { html } from "htm/preact";

import PreviewVideo from "../Molecules/PreviewVideo.js";
import DownloadBtn from "../Molecules/DownloadBtn.js";
import useConverter from "../hooks/useConverter.js";
import PrimaryBtn from "../Molecules/PrimaryBtn.js";

/**
 * @component Component to be rendered after recording.
 */
function After({ recording, restart }) {
  const { mp4Url, webmUrl } = useConverter(recording);

  return html`
    <div class="mb-3">
      <${PreviewVideo} url=${webmUrl} />
    </div>
    <div class="text-center">
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
