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
  const { start, isRecording, stream, stop } = useRecorder({ onFinish });
  const [primary, setPrimary] = useState(null);

  const handleStart = (constraints) => {
    const type = {
      screen: true,
      camera: true,
    };
    if (primary === "screen") {
      type.camera = false;
    } else if (primary === "camera") {
      type.screen = false;
    }
    start({ type, constraints });
  };

  return isRecording
    ? html` <${Preview} stream=${stream} onStop=${stop} /> `
    : html`
        <div>
          ${!primary
            ? html` <${MainOptions} setPrimary=${setPrimary} /> `
            : html`
                <${SecondaryOptions}
                  primary=${primary}
                  onStart=${handleStart}
                  reset=${() => setPrimary(null)}
                />
              `}
        </div>
      `;
}

export default Intro;
