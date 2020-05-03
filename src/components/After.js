import { html } from "htm/preact";

import DownloadBtn from "../Molecules/DownloadBtn.js";
import useConverter from "../hooks/useConverter.js";

/**
 * @component Component to be rendered after recording.
 */
function After({ recording }) {
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
    </div>
  `;
}

export default After;
