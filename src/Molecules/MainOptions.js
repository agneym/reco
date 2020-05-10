import { html } from "htm/preact";

import StartBtn from "./StartBtn.js";

function MainOptions({ setPrimary }) {
  return html`
  <h1
    class="text-md text-gray-600 text-center font-normal m-6"
  >
    Choose an option to start recording
  </h1>
  <${StartBtn} onClick=${() => setPrimary("screen")}>
    <img src='/podcast.svg' alt='' />
    <p>Screen</p>
  </${StartBtn}>
  <${StartBtn} onClick=${() => setPrimary("camera")}>
    <img src='/profile.svg' alt='' />
    <p>Camera</p>
  </${StartBtn}>
  <${StartBtn} onClick=${() => setPrimary("screen+cam")}>
    <img src='/webpage.svg' alt='' />
    <p>Screen + Cam</p>
  </${StartBtn}>
  `;
}

export default MainOptions;
