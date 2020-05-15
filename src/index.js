import { render } from "preact";
import { html } from "htm/preact";
import { useState } from "preact/hooks";

import "./styles.css";
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
    <main class="grid justify-center items-center min-h-screen">
      ${!recording
        ? html`<${Intro} onFinish=${completeRecording} />`
        : html`<${After} restart=${restart} recording=${recording} />`}
    </main>
  `;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const appEl = document.getElementById("app");
render(html`<${App} />`, appEl);
