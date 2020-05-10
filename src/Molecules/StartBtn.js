import { html } from "htm/preact";

function StartBtn({ onClick, children }) {
  return html`
    <button
      class="m-5 px-8 py-4 shadow-lg hover:shadow-xl focus:shadow-outline"
      onClick=${onClick}
    >
      ${children}
    </button>
  `;
}

export default StartBtn;
