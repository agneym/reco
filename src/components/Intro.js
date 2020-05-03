import { html } from "htm/preact";

import useRecorder from "../hooks/useRecorder.js";
import StartBtn from "../Molecules/StartBtn.js";

/**
 * @component HomePage. All functionalities start here.
 */
function Intro({ onFinish }) {
  const { start } = useRecorder({ onFinish });
  return html`
    <div>
      <h1 class="text-xl text-center font-medium m-5">Start Recording</h1>
      <${StartBtn} onClick=${start}>Screen</${StartBtn}>
      <${StartBtn} onClick=${start}>Camera</${StartBtn}>
      <${StartBtn} onClick=${start}>Screen + Cam</${StartBtn}>
    </div>
  `;
}

export default Intro;
