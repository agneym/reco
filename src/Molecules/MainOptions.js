import { html } from "htm/preact";

import StartBtn from "./StartBtn.js";

function MainOptions({ setPrimary }) {
  return html`
  <h1
    class="text-2xl uppercase tracking-wide text-center font-normal m-6"
  >
    Start Recording
  </h1>
  <${StartBtn} onClick=${() => setPrimary("screen")}>Screen</${StartBtn}>
  <${StartBtn} onClick=${() => setPrimary("camera")}>Camera</${StartBtn}>
  <${StartBtn} onClick=${() =>
    setPrimary("screen+cam")}>Screen + Cam</${StartBtn}>
  `;
}

export default MainOptions;
