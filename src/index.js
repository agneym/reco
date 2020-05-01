import { render } from "preact";
import { html } from "htm/preact";
import { useState } from "preact/hooks";

import Intro from "./components/Intro.js";
import After from "./components/After.js";

function App() {
  const [recording, setRecording] = useState();
  const completeRecording = (blob) => {
    setRecording(blob);
  };
  return html`
    <main>
      ${!recording
        ? html`<${Intro} onFinish=${completeRecording} />`
        : html`<${After} recording=${recording} />`}
    </main>
  `;
}

const appEl = document.getElementById("app");
render(html`<${App} />`, appEl);
