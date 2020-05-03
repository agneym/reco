import { useState } from "preact/hooks";
import VideoStreamMerger from "video-stream-merger";

/**
 * Record screen to capture output.
 * @returns {MediaStream}
 */
async function captureScreen() {
  return await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: "always",
    },
    audio: false,
  });
}

/**
 * Record camera to capture webcam output.
 * @returns {MediaStream}
 */
async function captureCamera() {
  return await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
}

/**
 * Initialise Media recorder and start recording a stream.
 * @param {MediaStream} stream
 */
async function recordStream(stream) {
  const recorder = new MediaRecorder(stream, {
    mimeType: "video/webm",
  });
  recorder.start();
  return recorder;
}

/**
 * Merge streams together and return result
 * @param {MediaStream} camera camera stream
 * @param {MediaStream} screen screen stream
 */
async function mergeCameraScreen(camera, screen) {
  const merger = VideoStreamMerger({
    width: window.screen.width,
    height: window.screen.height,
  });
  merger.addStream(screen, {
    x: 0,
    y: 0,
    width: merger.width,
    height: merger.height,
    mute: true,
  });
  merger.addStream(camera, {
    x: merger.width - 320,
    y: merger.height - 240,
    width: 320,
    height: 240,
    mute: false,
  });
  merger.start();
  return merger.result;
}

/**
 * A recorder custom hook
 * @param {Object} options
 * @param {useRecorder~onFinish} options.onFinish callback called when recording completes.
 */
function useRecorder({ onFinish }) {
  const [error, setError] = useState(null);

  const startRecording = async () => {
    let screen;
    let camera;
    let stream;
    let chunks = [];
    let mediaRecorder;
    const stopCapture = async () => {
      mediaRecorder.stop();
      [stream, screen, camera].forEach((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      });
      setTimeout(() => {
        const recording = new Blob(chunks, { type: "video/webm" });
        onFinish(recording);
      }, 0);
    };
    try {
      screen = await captureScreen();
      camera = await captureCamera();
      screen.addEventListener("inactive", stopCapture);
      stream = await mergeCameraScreen(camera, screen);
      mediaRecorder = await recordStream(stream);
      mediaRecorder.addEventListener("dataavailable", (event) => {
        const data = event.data;
        if (data && data.size > 0) {
          chunks.push(data);
        }
      });
    } catch (err) {
      setError(err);
    }
  };
  return {
    error,
    start: startRecording,
  };
}

/**
 * @callback useRecorder~onFinish
 * @param {Blob} blob
 */

export default useRecorder;
