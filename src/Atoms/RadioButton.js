import { html } from "htm/preact";

function RadioButton({ id, name, value, label }) {
  return html`
    <div class="my-1">
      <input type="radio" id=${id} name=${name} value=${value} class="mr-4 leading-tight" />
      <label for=${id}>${label}</label><br />
    </div>
  `;
}

export default RadioButton;
