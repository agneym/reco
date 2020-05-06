import { html } from "htm/preact";
import { useState } from "preact/hooks";

import Checkbox from "../Atoms/Checkbox.js";
import RadioButtonGroup from "../Atoms/RadioButtonGroup.js";
import StartBtn from "./StartBtn.js";

const cursorValues = [{
  label: "Always",
  value: "always",
}, {
  label: "Moving",
  value: "moving",
}, {
  label: "Never",
  value: "never",
}]

function SecondaryOptions({ primary, start, reset }) {
  const [audio, setAudio] = useState(true);
  return html`
    <h1 class="text-2xl tracking-wide text-center font-normal m-4">
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
      ${primary.includes('screen') && html`
        <div class="mt-6">
          <${RadioButtonGroup} label="Do you want to record cursor?" values=${cursorValues} name="cursor" />
        </div>
      `}
      <${StartBtn} onClick=${start}>Start Recording</${StartBtn}>
    </div>
  `;
}

export default SecondaryOptions;
