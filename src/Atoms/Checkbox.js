import { html } from "htm/preact";

function Checkbox({ id, label, name, checked, onChange }) {
  return html`
    <div class="">
      <input
        type="checkbox"
        id=${id}
        class="mr-4 leading-tight"
        name=${name}
        checked=${checked}
        onChange=${onChange}
      />
      <label htmlFor=${id}>${label}</label>
    </div>
  `;
}

export default Checkbox;
