import { html } from "htm/preact";

function Preview({ stream }) {
  return html`
    <div>
      <h1 class="text-xl text-center font-medium m-5">
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
    </div>
  `;
}

export default Preview;
