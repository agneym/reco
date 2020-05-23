import { html } from "htm/preact";

import SecondaryBtn from "../Atoms/SecondaryBtn";

function ErrorMessage({ error }) {
  const restart = () => {
    window.location.reload();
  };
  return html`
    <div class="text-center max-w-sm" role="alert">
      <h4 class="font-semibold text-md mb-4">
        Hey! Looks like we ran into an error
      </h4>
      <p>
        We might be seeing this because we don't have the required permissions.
        To unblock permissions, see options for your browser below:
      </p>
      <div class="flex space-x-4 my-4 justify-center text-center">
        <a
          class="underline"
          href="https://support.google.com/chrome/answer/2693767#change"
          >Google Chrome</a
        >
        <a
          class="underline"
          href="https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions"
          >Firefox</a
        >
      </div>
      <details class="my-4">
        <summary>Error Message</summary>
        <pre class="py-2">${error?.toString()}</pre>
      </details>
      <p class="">
        <span>If you think it's us, </span>
        <a class="underline" href="https://github.com/agneym/reco/issues"
          >File an issue</a
        >
        <span> with error message</span>
      </p>
      <${SecondaryBtn} class='mt-6 mx-auto' onClick=${restart}>Restart</${SecondaryBtn}>
    </div>
  `;
}

export default ErrorMessage;
