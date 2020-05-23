import { html } from "htm/preact";
import { motion } from "framer-motion";

function StartBtn({ img: Image, onClick, children }) {
  return html`
    <${motion.button}
      class="mt-5 mx-8 px-12 py-6 shadow-lg hover:shadow-xl focus:shadow-outline bg-white dark:bg-gray-800 dark:text-gray-300"
      animate
      onClick=${onClick}
    >
      <${Image} aria-hidden="true" class="w-16 d-block mx-auto" />
      <p class="mt-4">${children}</p>
    </${motion.button}>
  `;
}

export default StartBtn;
