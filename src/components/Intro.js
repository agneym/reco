import { html } from "htm/preact";
import { useState } from "preact/hooks";

import useRecorder from "../hooks/useRecorder.js";
import Preview from "./Preview.js";
import MainOptions from "../Molecules/MainOptions.js";
import SecondaryOptions from "../Molecules/SecondaryOptions.js";

/**
 * @component HomePage. All functionalities start here.
 */
function Intro({ onFinish }) {
  const { isRecording, stream, stop } = useRecorder({ onFinish });
  const [primary, setPrimary] = useState(null);

  return isRecording
    ? html` <${Preview} stream=${stream} onStop=${stop} /> `
    : html`
        <div>
          ${!primary
            ? html` <${MainOptions} setPrimary=${setPrimary} /> `
            : html` <${SecondaryOptions} primary=${primary} /> `}
        </div>
      `;
}

export default Intro;
