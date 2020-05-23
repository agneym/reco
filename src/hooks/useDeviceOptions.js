import { useState, useEffect } from "preact/hooks";
import enumerateDevices from "enumerate-devices";
import { useToasts } from "react-toast-notifications";

import useLocalStorage from "./useLocalStorage";

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
  const [devices, setDevices] = useState({ ...initialDevices });
  const [permission, setPermission] = useLocalStorage("reco_permission", {
    status: "wait",
  });
  const { addToast } = useToasts();
  const [error, setError] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);

  useEffect(() => {
    setError(null);
    const getPermission = async () => {
      if (permission?.status === "granted") {
        return;
      }
      try {
        addToast(
          "We are asking for permissions to read names of devices you have connected.",
          {
            appearance: "info",
            autoDismiss: true,
          }
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setPermission({ status: "granted" });
      } catch (err) {
        setPermission({ status: "wait" });
      }
    };
    const getDevices = async () => {
      try {
        await getPermission();
        const devices = await enumerateDevices();

        const options = devices.reduce((acc, device) => {
          const option = {
            label: device.label ?? "Default Device",
            value: device.deviceId,
          };
          if (device.kind === "audioinput") {
            acc.audio.push(option);
          } else if (device.kind === "videoinput") {
            acc.video.push(option);
          }
          return acc;
        }, JSON.parse(JSON.stringify(initialDevices)));
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
