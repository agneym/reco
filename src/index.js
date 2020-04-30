import { h, render } from "preact";
import htm from "htm";

const html = htm.bind(h);
const appEl = document.getElementById("app");

function SomePreactComponent() {
  return html`<h1 style="color: red">Hello, World!</h1>`;
}

render(html`<${SomePreactComponent} />`, appEl);

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

const chunks = [];
let mediaRecorder = null;
let stream = null;

function stopCapture() {
  if (mediaRecorder && stream) {
    mediaRecorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    setTimeout(() => {
      const recording = new Blob(chunks, { type: "video/webm" });
      convert(recording);
    }, 1000);
  }
}

async function startRecording() {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: "always",
      },
      audio: false,
    });
    stream.addEventListener("inactive", stopCapture);
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorder.start();
    mediaRecorder.addEventListener("dataavailable", (event) => {
      const data = event.data;
      if (data && data.size > 0) {
        chunks.push(data);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startRecording);
