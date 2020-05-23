import { html } from "htm/preact";
import DarkModeToggle from "react-dark-mode-toggle";

function ModeToggle({ darkMode }) {
  return html`
    <${DarkModeToggle}
      onChange=${darkMode.toggle}
      checked=${darkMode.value}
      size=${50}
    />
  `;
}

export default ModeToggle;
