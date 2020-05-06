import { html } from "htm/preact";

import RadioButton from "./RadioButton.js";

function RadioButtonGroup({ name, values, label }) {
  return html`
    <div>
      <legend class="inline mb-2">${label}</legend>
      <div>
        ${values.map(({ label, value }) => html`
          <${RadioButton} label=${label} value=${value} name=${name} id=${`${name}-${value}`} />
        `)}
      </div>
    </div>
  `;
}

export default RadioButtonGroup;
