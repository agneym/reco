import { html } from "htm/preact";

function Select({ labelText, id, options, onChange }) {
  return html`
    <label htmlFor=${id}>${labelText}</label>
    <select
      id=${id}
      name=${name}
      class="select w-full block mt-1"
      onChange=${onChange}
    >
      ${options.map(
        ({ label, value }) => html` <option value=${value}>${label}</option> `
      )}
    </select>
  `;
}

export default Select;
