import { html } from "htm/preact";
import { useMemo } from "preact/hooks";

/**
 * @component Component to be rendered after recording.
 */
function After({ recording }) {
  const webmUrl = useMemo(() => {
    return URL.createObjectURL(recording);
  }, [recording]);
  return html` <video controls autoplay src=${webmUrl} /> `;
}

export default After;
