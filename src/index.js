import { render } from "preact";
import { html } from "htm/preact";
import { useState } from "preact/hooks";

import Intro from "./components/Intro.js";
import After from "./components/After.js";

function App() {
  const [recording, setRecording] = useState(null);
  const restart = () => {
    setRecording(null);
  };
  const completeRecording = (blob) => {
    setRecording(blob);
  };
  return html`
    <main class="flex justify-center items-center min-h-screen">
      ${!recording
        ? html`<${Intro} onFinish=${completeRecording} />`
        : html`<${After} restart=${restart} recording=${recording} />`}
    </main>
  `;
}

const appEl = document.getElementById("app");
render(html`<${App} />`, appEl);
