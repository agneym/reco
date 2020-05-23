import { html } from "htm/preact";

import PrimaryBtn from "../Atoms/PrimaryBtn.js";

function Preview({ stream, onStop }) {
  return html`
    <div class="text-center">
      <h1 class="text-md text-gray-700 dark:text-gray-600 text-center font-normal m-6">
        Recording in Progress ...
      </h1>
      ${
        stream &&
        html`
          <video
            playsinline
            muted
            autoplay
            id="preview-video"
            srcObject=${stream}
            class="max-w-xl"
          ></video>
        `
      }
      <${PrimaryBtn}
        class="mt-6"
        onClick=${onStop}
      >
        Stop Recording
      </${PrimaryBtn}>
    </div>
  `;
}

export default Preview;
