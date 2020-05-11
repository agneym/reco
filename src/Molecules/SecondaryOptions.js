import { html } from "htm/preact";
import { useState } from "preact/hooks";

import useDeviceOptions from "../hooks/useDeviceOptions.js";
import Checkbox from "../Atoms/Checkbox.js";
import RadioButtonGroup from "../Atoms/RadioButtonGroup.js";
import PrimaryBtn from "./PrimaryBtn.js";
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

function SecondaryOptions({ primary, onStart, reset }) {
  const [audio, setAudio] = useState(true);
  const [cursor, setCursor] = useState("always");
  const deviceOptions = useDeviceOptions();

  const handleStart = () => {
    const constraints = {
      audio,
      video: {
        cursor,
      },
    };
    onStart(constraints);
  };

  const handleSelectAudioDevice = () => {};

  return html`
    <h1 class="text-xl text-gray-700 tracking-wide text-center font-normal my-4">
      You have choosen to record ${primary.toUpperCase()}
    </h1>
    <button class="block mx-auto underline" onClick=${reset}>Choose Another</button>
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
      <div class="mt-6 text-left">
        <${Select} options=${
    deviceOptions.audio
  } labelText="Audio Devices" id="audio" onChange=${handleSelectAudioDevice} />
      </div>
      <div class="mt-4 text-left">
        <${Select} options=${
    deviceOptions.video
  } labelText="Video Devices" id="audio" onChange=${handleSelectAudioDevice} />
      </div>
      <${PrimaryBtn} className='mt-12' onClick=${handleStart}>Start Recording</${PrimaryBtn}>
    </div>
  `;
}

export default SecondaryOptions;
