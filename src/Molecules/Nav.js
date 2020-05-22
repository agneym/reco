import { html } from "htm/preact";
import { motion } from "framer-motion";

import githubIcon from "../icons/github.svg";
import twitterIcon from "../icons/twitter.svg";
import bmcIcon from "../icons/coffee.svg";

function IconLink({ text, link, icon, width = 18 }) {
  return html`
    <${
      motion.a
    } class='opacity-75 p-1' title=${text} href=${link} target="_blank" rel="noopener noreferrer" whileHover=${{
    scale: 1.05,
    opacity: 1,
  }}>
      <img src=${icon} width=${width} alt='${text}' />
    </${motion.a}>
  `;
}

function Nav() {
  return html`
    <nav class="flex justify-end items-center space-x-3 fixed w-full px-6 pt-3">
      <${IconLink}
        width=${20}
        icon=${githubIcon}
        text="Github App Source"
        link="https://github.com/agneym/reco"
      />
      <${IconLink}
        width=${23}
        icon=${twitterIcon}
        text="Share on Twitter"
        link="https://twitter.com/share?url=https%3A%2F%2Freco.agney.dev%2F&via=agneymenon"
      />
      <${IconLink}
        icon=${bmcIcon}
        text="Buy me a Coffee"
        link="https://www.buymeacoffee.com/agney"
      />
    </nav>
  `;
}

export default Nav;
