import { html } from "htm/preact";

import podcast from "../icons/podcast.svg";
import profile from "../icons/profile.svg";
import webpage from "../icons/webpage.svg";
import StartBtn from "./StartBtn.js";

function MainOptions({ setPrimary }) {
  return html`
    <h1
      class="text-md text-gray-700 text-center font-normal m-6"
    >
      Choose an option to start recording
    </h1>
    <${StartBtn} onClick=${() => setPrimary("screen")} imgUrl=${podcast}>
      Screen
    </${StartBtn}>
    <${StartBtn} onClick=${() => setPrimary("camera")} imgUrl=${profile}>
      Camera
    </${StartBtn}>
    <${StartBtn} onClick=${() => setPrimary("screen+cam")} imgUrl=${webpage}>
      Screen + Cam
    </${StartBtn}>
  `;
}

export default MainOptions;
