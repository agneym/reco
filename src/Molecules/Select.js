import { html } from "htm/preact";
import { motion } from "framer-motion";
import classnames from "classnames";

function Select({ labelText, disabled, id, options, onChange }) {
  return html`
    <${motion.label}
      animate
      htmlFor=${id}
      class=${classnames("block", {
        "text-gray-600": disabled,
      })}  
    >${labelText}</label>
    <${motion.select}
      id=${id}
      disabled=${disabled}
      name=${name}
      animate
      class=${classnames("select w-full block mt-1", {
        "opacity-50 bg-gray-400": disabled,
      })}
      onChange=${onChange}
    >
      ${options.map(
        ({ label, value }) => html` <option value=${value}>${label}</option> `
      )}
    </${motion.select}>
  `;
}

export default Select;
