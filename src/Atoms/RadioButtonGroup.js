import { html } from "htm/preact";

import RadioButton from "./RadioButton.js";

function RadioButtonGroup({ name, values, label, selected, onChange }) {
  return html`
    <div>
      <legend class="inline mb-2">${label}</legend>
      <div>
        ${values.map(({ label, value }) => html`
          <${RadioButton} checked=${value===selected} onChange=${onChange} label=${label} value=${value} name=${name} id=${`${name}-${value}`} />
        `)}
      </div>
    </div>
  `;
}

export default RadioButtonGroup;
