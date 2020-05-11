import { useState, useEffect } from "preact/hooks";
import enumerateDevices from "enumerate-devices";

const initialDevices = {
  audio: [],
  video: [],
};

function useDeviceOptions() {
  const [devices, setDevices] = useState(initialDevices);

  useEffect(() => {
    const getDevices = async () => {
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
    };
    getDevices();
  }, []);

  return devices;
}

export default useDeviceOptions;
