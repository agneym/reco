import { html } from "htm/preact";

import useRecorder from "../hooks/useRecorder.js";

/**
 * @component Starting Component
 */
function Intro({ onFinish }) {
  const { start } = useRecorder({ onFinish });
  return html`<button onClick=${start}>Start Recording</button> `;
}

export default Intro;
