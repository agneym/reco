import { html } from "htm/preact";

import podcast from "../icons/podcast.svg";
import profile from "../icons/profile.svg";
import webpage from "../icons/webpage.svg";
import StartBtn from "./StartBtn.js";

function MainOptions({ setPrimary }) {
  return html`
    <h1
      class="text-md text-gray-700 dark:text-gray-600 text-center font-normal m-6"
    >
      Choose an option to start recording
    </h1>
    <${StartBtn} onClick=${() => setPrimary("screen")} img=${podcast}>
      Screen
    </${StartBtn}>
    <${StartBtn} onClick=${() => setPrimary("camera")} img=${profile}>
      Camera
    </${StartBtn}>
    <${StartBtn} onClick=${() => setPrimary("screen+cam")} img=${webpage}>
      Screen + Cam
    </${StartBtn}>
  `;
}

export default MainOptions;
