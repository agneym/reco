import { useState } from "preact/hooks";

/**
 * A recorder custom hook
 * @param {Object} options
 * @param {useRecorder~onFinish} options.onFinish callback called when recording completes.
 */
function useRecorder({ onFinish }) {
  const [error, setError] = useState(null);

  const startRecording = async () => {
    let stream;
    let chunks = [];
    let mediaRecorder;
    const stopCapture = async () => {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      setTimeout(() => {
        const recording = new Blob(chunks, { type: "video/webm" });
        onFinish(recording);
      }, 0);
    };
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
