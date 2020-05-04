import { html } from "htm/preact";

import useRecorder from "../hooks/useRecorder.js";
import Preview from "./Preview.js";
import MainOptions from "../Molecules/MainOptions";

/**
 * @component HomePage. All functionalities start here.
 */
function Intro({ onFinish }) {
  const { start, isRecording, stream, stop } = useRecorder({ onFinish });

  return isRecording
    ? html` <${Preview} stream=${stream} onStop=${stop} /> `
    : html`
        <div>
          <h1
            class="text-2xl uppercase tracking-wide text-center font-normal m-6"
          >
            Start Recording
          </h1>
          <${MainOptions} start=${start} />
        </div>
      `;
}

export default Intro;
