import { html } from "htm/preact";

import useRecorder from "../hooks/useRecorder.js";
import StartBtn from "../Molecules/StartBtn.js";

/**
 * @component HomePage. All functionalities start here.
 */
function Intro({ onFinish }) {
  const { start } = useRecorder({ onFinish });
  const screenConstraints = {
    video: {
      cursor: "always",
    },
    audio: false,
  };
  const cameraConstraints = {
    audio: true,
    video: true,
  };
  return html`
    <div>
      <h1 class="text-xl text-center font-medium m-5">Start Recording</h1>
      <${StartBtn} onClick=${() =>
    start({
      constraints: {
        screen: screenConstraints,
      },
    })}>Screen</${StartBtn}>
      <${StartBtn} onClick=${() =>
    start({
      constraints: {
        camera: cameraConstraints,
      },
    })}>Camera</${StartBtn}>
      <${StartBtn} onClick=${() =>
    start({
      constraints: {
        screen: screenConstraints,
        camera: cameraConstraints,
      },
    })}>Screen + Cam</${StartBtn}>
    </div>
  `;
}

export default Intro;
