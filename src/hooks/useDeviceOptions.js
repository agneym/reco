import { useState, useEffect } from "preact/hooks";
import enumerateDevices from "enumerate-devices";

const initialDevices = {
  audio: [],
  video: [],
};

/**
 * Custom hook for getting connected devices list.
 * Enumerate Devices API is not behind an API but requires permission to show device names.
 * Permissions API for camera and microphone is only supported on Chrome as of now. We are using Local Storage to know if user has granted permission to access camera and microphone before.
 */
function useDeviceOptions() {
  const [devices, setDevices] = useState(initialDevices);
  const [error, setError] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);

  useEffect(() => {
    setError(null);
    const getDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        const devices = await enumerateDevices();
        const options = devices.reduce(
          (acc, device) => {
            const option = {
              label: device.label,
              value: device.deviceId,
            };
            if (device.kind === "audioinput") {
              acc.audio.push(option);
            } else if (device.kind === "videoinput") {
              acc.video.push(option);
            }
            return acc;
          },
          { ...initialDevices }
        );
        setDevices(options);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
    getDevices();
    document.addEventListener("devicechange", getDevices);

    return () => {
      document.removeEventListener("devicechange", getDevices);
    };
  }, []);

  const setSelectedDevice = (type, event) => {
    const deviceId = event.target.value;
    if (type === "audio") {
      setSelectedAudioDevice(deviceId);
    } else {
      setSelectedVideoDevice(deviceId);
    }
  };

  return {
    devices,
    error,
    selectedAudioDevice,
    selectedVideoDevice,
    setSelectedDevice,
  };
}

export default useDeviceOptions;
