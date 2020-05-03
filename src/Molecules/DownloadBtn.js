import { html } from "htm/preact";
import classnames from "classnames";

function DownloadBtn({ href, children }) {
  return html`
    <a
      href=${href}
      download="screen-recording.mp4"
      class=${classnames(
        "shadow rounded-sm m-5 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white text-center",
        {
          "bg-opacity-25": !href,
        }
      )}
      title=${href
        ? "Click to Download"
        : "Processing your Download, Please wait..."}
    >
      ${children}
    </a>
  `;
}

export default DownloadBtn;
