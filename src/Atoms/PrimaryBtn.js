import { html } from "htm/preact";
import classnames from "classnames";

function PrimaryBtn({ className, onClick, children }) {
  return html`
    <button
      onClick=${onClick}
      class=${classnames(
        "px-6 py-4 rounded-sm bg-pink-600 hover:bg-pink-700 dark:bg-pink-700 dark-hover:bg-pink-600 focus:shadow-outline text-white text-center",
        className
      )}
    >
      ${children}
    </button>
  `;
}

export default PrimaryBtn;
