import { html } from "htm/preact";

import useRecorder from "../hooks/useRecorder.js";

function Intro() {
  const { start } = useRecorder();
  return html` <button onClick=${start}>Start Recording</button> `;
}

export default Intro;
