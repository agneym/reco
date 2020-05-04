import { html } from "htm/preact";

import StartBtn from "./StartBtn.js";

function MainOptions({ start }) {
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
  `;
}

export default MainOptions;
