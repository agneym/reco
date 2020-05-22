import { html } from "htm/preact";
import { useState } from "preact/hooks";

import useRecorder from "../hooks/useRecorder.js";
import Preview from "./Preview.js";
import MainOptions from "../Molecules/MainOptions.js";
import SecondaryOptions from "../Molecules/SecondaryOptions.js";
import Name from "../Atoms/Name.js";
import ErrorMessage from "../Molecules/Error";

/**
 * @component HomePage. All functionalities start here.
 */
function Intro({ onFinish }) {
  const { start, isRecording, stream, stop, error } = useRecorder({ onFinish });
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

  return html`
    <div>
      <header class="mb-24">
        <${Name} />
      </header>
      ${error
        ? html`<${ErrorMessage} error=${error} />`
        : isRecording
        ? html` <${Preview} error=${error} stream=${stream} onStop=${stop} /> `
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
          `}
    </div>
  `;
}

export default Intro;
