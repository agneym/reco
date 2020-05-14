import { html } from "htm/preact";
import { useState } from "preact/hooks";

import PreviewVideo from "../Molecules/PreviewVideo.js";
import useConverter from "../hooks/useConverter.js";
import PrimaryBtn from "../Molecules/PrimaryBtn.js";

/**
 * @component Component to be rendered after recording.
 */
function After({ recording, restart }) {
  const { webmUrl, convert } = useConverter(recording);
  const [trimValues, setTrimValues] = useState([]);

  return html`
    <div class="mb-3">
      <${PreviewVideo}
        url=${webmUrl}
        trimValues=${trimValues}
        setTrimValues=${setTrimValues}
      />
    </div>
    <div class="text-center">
      <${PrimaryBtn} onClick=${() => convert(trimValues)}>
        Export video
      </${PrimaryBtn}>
      <div class="mt-8">
        <${PrimaryBtn} onClick=${restart}>Restart Recording</${PrimaryBtn}>
      </div>
    </div>
  `;
}

export default After;
