import { html } from "htm/preact";
import { useState, useEffect } from "preact/hooks";
import enumerateDevices from "enumerate-devices";

import Checkbox from "../Atoms/Checkbox.js";
import RadioButtonGroup from "../Atoms/RadioButtonGroup.js";
import PrimaryBtn from "./PrimaryBtn.js";

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

  useEffect(() => {
    const getDevices = async () => {
      const devices = await enumerateDevices();
      console.log(devices);
    };
    getDevices();
  });

  const handleStart = () => {
    const constraints = {
      audio,
      video: {
        cursor,
      },
    };
    onStart(constraints);
  };

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
      <div class="mt-4">
        <select class="select w-100 block">
          <option>One</option>
        </select>
      </div>
      <${PrimaryBtn} className='mt-12' onClick=${handleStart}>Start Recording</${PrimaryBtn}>
    </div>
  `;
}

export default SecondaryOptions;
