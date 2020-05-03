import { html } from "htm/preact";

function Preview() {
  return html`
    <div>
      <h1>Recoding in Progress ...</h1>
      <video playsinline muted autoplay id="preview-video"></video>
    </div>
  `;
}

export default Preview;
