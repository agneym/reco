import { html } from "htm/preact";

function StartBtn({ imgUrl, onClick, children }) {
  return html`
    <button
      class="mt-5 mx-8 px-12 py-6 shadow-lg hover:shadow-xl focus:shadow-outline"
      onClick=${onClick}
    >
      <img src=${imgUrl} alt="" class="w-16 d-block mx-auto" />
      <p class="mt-4">${children}</p>
    </button>
  `;
}

export default StartBtn;
