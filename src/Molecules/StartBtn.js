import { html } from "htm/preact";

function StartBtn({ onClick, children }) {
  return html`
    <button
      class="m-5 px-8 py-4 bg-teal-600 shadow text-white"
      onClick=${onClick}
    >
      ${children}
    </button>
  `;
}

export default StartBtn;
