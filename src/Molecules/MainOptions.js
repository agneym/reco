import { html } from "htm/preact";

import StartBtn from "./StartBtn.js";

function MainOptions({ setPrimary }) {
  return html`
  <h1
    class="text-md text-gray-600 text-center font-normal m-6"
  >
    Choose an option to start recording
  </h1>
  <${StartBtn} onClick=${() => setPrimary("screen")} imgUrl='/podcast.svg'>
    Screen
  </${StartBtn}>
  <${StartBtn} onClick=${() => setPrimary("camera")} imgUrl='/profile.svg'>
    Camera
  </${StartBtn}>
  <${StartBtn} onClick=${() => setPrimary("screen+cam")} imgUrl='/webpage.svg'>
    Screen + Cam
  </${StartBtn}>
  `;
}

export default MainOptions;
