import { html } from "htm/preact";

function Preview({ stream, onStop }) {
  return html`
    <div class="text-center">
      <h1 class="text-xl font-medium m-5">
        Recoding in Progress ...
      </h1>
      ${stream &&
      html`
        <video
          playsinline
          muted
          autoplay
          id="preview-video"
          srcObject=${stream}
        ></video>
      `}
      <button class="bg-pink-600 m-5 px-8 py-4 text-white" onClick=${onStop}>
        Stop Recording
      </button>
    </div>
  `;
}

export default Preview;
