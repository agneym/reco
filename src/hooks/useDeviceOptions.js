import { useState, useEffect } from "preact/hooks";
import enumerateDevices from "enumerate-devices";

const initialDevices = {
  audio: [],
  video: [],
};

function useDeviceOptions() {
  const [devices, setDevices] = useState(initialDevices);
  const [error, setError] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);

  useEffect(() => {
    setError(null);
    const getDevices = async () => {
      try {
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
