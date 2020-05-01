import { useState } from "preact/hooks";

function useRecorder() {
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
        console.log(recording);
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

export default useRecorder;
