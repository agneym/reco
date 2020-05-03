import { useState } from "preact/hooks";
import VideoStreamMerger from "video-stream-merger";

/**
 * Record screen to capture output.
 * @param {Object} constraints Constraint for display media
 * @returns {MediaStream}
 */
async function captureScreen(constraints) {
  return await navigator.mediaDevices.getDisplayMedia(constraints);
}

/**
 * Record camera to capture webcam output.
 * @returns {MediaStream}
 */
async function captureCamera(constraints) {
  return await navigator.mediaDevices.getUserMedia(constraints);
}

/** @class Encapsulating MediaRecorder */
function RecordStream(stream) {
  /**
   * MediaRecorder object
   * @member {MediaRecorder}
   * @memberof {RecordStream}
   * @instance
   */
  this.recorder = new MediaRecorder(stream, {
    mimeType: "video/webm",
  });
  this.chunks = [];

  this.start = () => {
    this.recorder.start();
    this.recorder.addEventListener("dataavailable", (event) => {
      const data = event.data;
      if (data && data.size > 0) {
        this.chunks.push(data);
      }
    });
  };

  this.getBlobs = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Blob(this.chunks, { type: "video/webm" }));
      }, 0);
    });
  };

  this.stop = async () => {
    this.recorder.stop();
    return this.getBlobs();
  };
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
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);

  /**
   * Start recording function
   */
  const startRecording = async ({ constraints }) => {
    let screenStream;
    let cameraStream;
    let mediaRecorder;
    const stopCapture = async () => {
      [stream, screenStream, cameraStream].filter(Boolean).forEach((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        stream.removeEventListener("inactive", stopCapture);
        stream.removeEventListener("ended", stopCapture);
      });
      const recording = await mediaRecorder.stop();
      onFinish(recording);
      setIsRecording(false);
    };
    try {
      screenStream =
        constraints.screen && (await captureScreen(constraints.screen));
      cameraStream =
        constraints.camera && (await captureCamera(constraints.camera));

      setIsRecording(true);

      const stream = await (() => {
        if (screenStream && cameraStream) {
          return mergeCameraScreen(cameraStream, screenStream);
        } else {
          return cameraStream || screenStream;
        }
      })();

      stream.addEventListener("inactive", stopCapture);
      stream.addEventListener("ended", stopCapture);
      setStream(stream);

      mediaRecorder = new RecordStream(stream);
      mediaRecorder.start();
    } catch (err) {
      setError(err);
      console.log(err);
      setIsRecording(false);
    }
  };
  return {
    error,
    start: startRecording,
    isRecording,
    stream,
  };
}

/**
 * @callback useRecorder~onFinish
 * @param {Blob} blob
 */

export default useRecorder;
