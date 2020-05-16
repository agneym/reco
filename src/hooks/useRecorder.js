import { useState, useRef, useEffect, useCallback } from "preact/hooks";
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
    if (this.recorder.state != "inactive") {
      this.recorder.stop();
    }
    return this.getBlobs();
  };
}

/**
 * Merge streams together and return result
 * @param {MediaStream} camera camera stream
 * @param {MediaStream} screen screen stream
 * @param {MediaStreamConstraints} constraints placed on the stream
 */
async function mergeCameraScreen(camera, screen, constraints) {
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
    mute: constraints.audio,
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

  const mediaRecorder = useRef(null);
  const cameraStream = useRef(null);
  const screenStream = useRef(null);

  const stopCapture = useCallback(async () => {
    [cameraStream.current, screenStream.current, stream]
      .filter(Boolean)
      .map((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        stream.removeEventListener("inactive", stopCapture);
        stream.removeEventListener("ended", stopCapture);
      });
    setStream(null);
    const recording = await mediaRecorder.current.stop();
    onFinish(recording);
    setIsRecording(false);
  }, [stream, onFinish]);

  useEffect(() => {
    if (stream) {
      /* When sharing a screen, users get an exclusive stop sharing screen button and get to use it instead of the one provided on our interface. */
      screenStream.current &&
        screenStream.current.addEventListener("inactive", stopCapture);
      stream.addEventListener("inactive", stopCapture);
      stream.addEventListener("ended", stopCapture);
    }
    return () => {
      if (stream) {
        screenStream.current &&
          screenStream.current.removeEventListener("inactive", stopCapture);
        stream.removeEventListener("inactive", stopCapture);
        stream.removeEventListener("ended", stopCapture);
      }
    };
  }, [stream, stopCapture]);

  /**
   * Start recording function
   */
  const startRecording = async ({ type, constraints }) => {
    try {
      screenStream.current = type.screen && (await captureScreen(constraints));
      cameraStream.current = type.camera && (await captureCamera(constraints));

      setIsRecording(true);

      const stream = await (() => {
        if (screenStream.current && cameraStream.current) {
          return mergeCameraScreen(
            cameraStream.current,
            screenStream.current,
            constraints
          );
        }
        return cameraStream.current || screenStream.current;
      })();

      setStream(stream);

      mediaRecorder.current = new RecordStream(stream);
      mediaRecorder.current.start();
    } catch (err) {
      setError(err);
      console.error(err);
      setIsRecording(false);
    }
  };
  return {
    error,
    start: startRecording,
    isRecording,
    stream,
    stop: stopCapture,
  };
}

/**
 * @callback useRecorder~onFinish
 * @param {Blob} blob
 */

export default useRecorder;
