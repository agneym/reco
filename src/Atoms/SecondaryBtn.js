import { html } from "htm/preact";
import classnames from "classnames";

function SecondaryBtn({ className, onClick, children }) {
  return html`
    <button
      onClick=${onClick}
      class=${classnames(
        "px-6 py-4 rounded-sm border-2 border-pink-500 hover:border-pink-600 focus:shadow-outline text-center",
        className
      )}
    >
      ${children}
    </button>
  `;
}

export default SecondaryBtn;
