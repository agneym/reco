import { render } from "preact";
import { html } from "htm/preact";
import { useState, useCallback } from "preact/hooks";
import { ToastProvider } from "react-toast-notifications";
import useDarkMode from "use-dark-mode";

import "./styles.css";
import Intro from "./components/Intro.js";
import After from "./components/After.js";
import Nav from "./Molecules/Nav";

function App() {
  const [recording, setRecording] = useState(null);
  const restart = () => {
    setRecording(null);
  };
  const completeRecording = useCallback((blob) => {
    setRecording(blob);
  }, []);
  const darkMode = useDarkMode(false, {
    element: document.documentElement,
    classNameDark: "mode-dark",
  });

  return html`
  <${ToastProvider}
    autoDismiss
  >
    <${Nav} darkMode=${darkMode} />
    <main class="grid justify-center items-center min-h-screen">
      ${
        !recording
          ? html`<${Intro} onFinish=${completeRecording} />`
          : html`<${After} restart=${restart} recording=${recording} />`
      }
    </main>
  </${ToastProvider}>
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
