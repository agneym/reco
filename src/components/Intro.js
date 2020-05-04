import { html, useState } from "htm/preact";

import useRecorder from "../hooks/useRecorder.js";
import Preview from "./Preview.js";
import MainOptions from "../Molecules/MainOptions";
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
          <h1
            class="text-2xl uppercase tracking-wide text-center font-normal m-6"
          >
            Start Recording
          </h1>
          ${!primary
            ? html` <${MainOptions} setPrimary=${setPrimary} /> `
            : html` <${SecondaryOptions} primary=${primary} /> `}
        </div>
      `;
}

export default Intro;
