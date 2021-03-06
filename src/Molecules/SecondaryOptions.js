import { html } from "htm/preact";
import { useState } from "preact/hooks";

import useDeviceOptions from "../hooks/useDeviceOptions.js";
import Checkbox from "../Atoms/Checkbox.js";
import RadioButtonGroup from "../Atoms/RadioButtonGroup.js";
import PrimaryBtn from "../Atoms/PrimaryBtn.js";
import Select from "./Select.js";

const cursorValues = [
  {
    label: "Always",
    value: "always",
  },
  {
    label: "Moving",
    value: "motion",
  },
  {
    label: "Never",
    value: "never",
  },
];
const requiresVideoDevice = ["screen+cam", "camera"];

function SecondaryOptions({ primary, onStart, reset }) {
  const [audio, setAudio] = useState(true);
  const [cursor, setCursor] = useState("always");
  const {
    devices: deviceOptions,
    selectedAudioDevice,
    selectedVideoDevice,
    setSelectedDevice,
  } = useDeviceOptions();
  const requireVideoDevice = requiresVideoDevice.includes(primary);

  const handleStart = () => {
    const constraints = {
      audio: audio && {
        deviceId: selectedAudioDevice,
      },
      video: {
        cursor,
        ...(requireVideoDevice && { deviceId: selectedVideoDevice }),
      },
    };
    onStart(constraints);
  };

  return html`
    <h1 class="text-md text-gray-700 dark:text-gray-400 tracking-wide text-center font-normal my-4">
      You have choosen to record ${primary.toUpperCase()}
    </h1>
    <button class="block text-gray-700 dark:text-gray-400 mx-auto underline" onClick=${reset}>Choose Another</button>
    <div class="text-center">
      <div class="mt-8">
        <${Checkbox}
          label="Include Audio"
          id="audio"
          name="audio"
          checked=${audio}
          onChange=${(event) => setAudio(event.target.checked)}
        />
      </div>
      ${
        primary.includes("screen") &&
        html`
          <div class="mt-6">
            <${RadioButtonGroup}
              label="Do you want to record cursor?"
              values=${cursorValues}
              name="cursor"
              selected=${cursor}
              onChange=${(event) => setCursor(event.target.value)}
            />
          </div>
        `
      }
      <div
        class="mt-6 text-left origin-top"
      >
        <${Select}
          options=${deviceOptions.audio}
          labelText="Audio Devices"
          id="audio"
          disabled=${!audio}
          onChange=${(event) => setSelectedDevice("audio", event)}
        />
      </div>
      ${
        requireVideoDevice &&
        html`
          <div class="mt-4 text-left">
            <${Select}
              options=${deviceOptions.video}
              labelText="Video Devices"
              id="video"
              onChange=${(event) => setSelectedDevice("video", event)}
            />
          </div>
        `
      }
      <${PrimaryBtn} className='mt-12' onClick=${handleStart}>Start Recording</${PrimaryBtn}>
    </div>
  `;
}

export default SecondaryOptions;
