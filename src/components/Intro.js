import { html } from "htm/preact";

import useRecorder from "../hooks/useRecorder.js";

function Intro({ onFinish }) {
  const { start } = useRecorder({ onFinish });
  return html`<button onClick=${start}>Start Recording</button> `;
}

export default Intro;
