import { html } from "htm/preact";

function RadioButton({ id, name, value, label }) {
  return html`
    <input type="radio" id=${id} name=${name} value=${value} />
    <label for=${id}>${label}</label><br />
  `;
}

export default RadioButton;
