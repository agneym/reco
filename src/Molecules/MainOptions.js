import { html } from "htm/preact";

import StartBtn from "./StartBtn.js";

function MainOptions({ setPrimary }) {
  return html`
  <${StartBtn} onClick=${() => setPrimary("screen")}>Screen</${StartBtn}>
  <${StartBtn} onClick=${() => setPrimary("camera")}>Camera</${StartBtn}>
  <${StartBtn} onClick=${() =>
    setPrimary("screen+cam")}>Screen + Cam</${StartBtn}>
  `;
}

export default MainOptions;
