import { html } from "htm/preact";
import { useState } from "preact/hooks";

import Checkbox from "../Atoms/Checkbox.js";

function SecondaryOptions({ primary, reset }) {
  const [audio, setAudio] = useState(false);
  return html`
    <h1 class="text-2xl tracking-wide text-center font-normal m-4">
      You have choosen to record ${primary.toUpperCase()}
    </h1>
    <button class="block mx-auto" onClick=${reset}>Choose Another</button>
    <div class="mt-8 text-center">
      <${Checkbox}
        label="Include Audio"
        id="audio"
        name="audio"
        checked=${audio}
        onChange=${(event) => setAudio(event.target.checked)}
      />
    </div>
  `;
}

export default SecondaryOptions;
