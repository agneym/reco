import { html } from "htm/preact";
import { useState } from "preact/hooks";

import Checkbox from "../Atoms/Checkbox.js";
import RadioButtonGroup from "../Atoms/RadioButtonGroup.js";
import StartBtn from "./StartBtn.js";

const cursorValues = [
  {
    label: "Always",
    value: "always",
  },
  {
    label: "Moving",
    value: "moving",
  },
  {
    label: "Never",
    value: "never",
  },
];

function SecondaryOptions({ primary, onStart, reset }) {
  const [audio, setAudio] = useState(true);
  const [cursor, setCursor] = useState("always");

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
      <${StartBtn} onClick=${handleStart}>Start Recording</${StartBtn}>
    </div>
  `;
}

export default SecondaryOptions;
