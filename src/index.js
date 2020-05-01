import { render } from "preact";
import { html } from "htm/preact";

import Intro from "./components/Intro.js";

function App() {
  return html`
    <main>
      <${Intro} />
    </main>
  `;
}

const appEl = document.getElementById("app");
render(html`<${App} />`, appEl);

/*
const worker = new Worker("../node_modules/ffmpeg.js/ffmpeg-worker-mp4.js");

worker.onmessage = function (e) {
  const msg = e.data;
  switch (msg.type) {
    case "ready":
      worker.postMessage({ type: "run", arguments: ["-version"] });
      break;
    case "stdout":
      console.log(msg.data);
      break;
    case "stderr":
      console.log(msg.data);
      break;
    case "done": {
      console.log(msg.data);
      const out = msg.data.MEMFS[0];
      if (out) {
        const blob = new Blob([out.data], {
          type: "video/mp4",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.getElementById("recording-link");
        link.href = url;
        link.click();
      }
      break;
    }
    case "error": {
      console.log(msg);
      break;
    }
    default:
      console.log("something happened");
  }
};

async function convert(testData) {
  const buffer = await testData.arrayBuffer();
  worker.postMessage({
    type: "run",
    MEMFS: [{ name: "test.webm", data: buffer }],
    arguments: ["-y", "-i", "test.webm", "-c:v", "copy", "out.mp4"],
  });
}

*/
