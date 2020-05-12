import { html } from "htm/preact";
import { motion } from "framer-motion";

function StartBtn({ imgUrl, onClick, children }) {
  return html`
    <${motion.button}
      class="mt-5 mx-8 px-12 py-6 shadow-lg hover:shadow-xl focus:shadow-outline bg-white"
      animate
      onClick=${onClick}
    >
      <img src=${imgUrl} alt="" class="w-16 d-block mx-auto" />
      <p class="mt-4">${children}</p>
    </${motion.button}>
  `;
}

export default StartBtn;
