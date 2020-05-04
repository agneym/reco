import { html } from "htm/preact";

function SecondaryOptions({ primary, reset }) {
  return html`
    <h1 class="text-2xl tracking-wide text-center font-normal m-4">
      You have choosen to record ${primary.toUpperCase()}
    </h1>
    <button class="block mx-auto" onClick=${reset}>Choose Another</button>
  `;
}

export default SecondaryOptions;
