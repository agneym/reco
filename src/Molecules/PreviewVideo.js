import { html } from "htm/preact";
import { useRef, useState, useLayoutEffect, useEffect } from "preact/hooks";
import Slider from "rc-slider";
import getBlobDuration from "get-blob-duration";

import usePrevious from "../hooks/usePrevious.js";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const pad = (strings, ...values) => {
  return strings.reduce((acc, str, index) => {
    const value =
      values[index] === undefined
        ? ""
        : values[index].toString().padStart(2, "0");
    return acc + str + value;
  }, "");
};

const formatTime = (s) => {
  let m = Math.floor(s / 60);
  s = s % 60;
  const h = Math.floor(m / 60);
  m = m % 60;
  return pad`${h}:${m}:${s}`;
};

function getChanged(newValue, previous) {
  if (newValue[0] !== previous[0]) {
    return newValue[0];
  }
  return newValue[1] || 0;
}

function PreviewVideo({ url }) {
  const videoElRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [trimValues, setTrimValues] = useState([]);

  const previousValue = usePrevious(trimValues);

  useLayoutEffect(() => {
    const getDuration = async () => {
      const duration = await getBlobDuration(url);
      setDuration(duration);
    };
    getDuration();
  }, []);

  useEffect(() => {
    if (duration) {
      setTrimValues([2, duration]);
    }
  }, [duration]);

  const handleSliderChange = (values) => {
    setTrimValues(values);
  };

  const handleSeek = (values) => {
    const seekHandle = getChanged(values, previousValue);
    videoElRef.current.currentTime = seekHandle;
  };

  return html`
    <video
      class="max-w-xl"
      controls
      autoplay
      preload="metadata"
      playsinline
      src=${url}
      ref=${videoElRef}
    />
    <div class="mt-6">
      <h2 class="text-base font-medium block mb-1">Trim Video :</h2>
      <${Range}
        min=${1}
        max=${duration}
        value=${trimValues}
        ariaLabelGroupForHandles=${["Trim Start Point", "Trim End Point"]}
        tipFormatter=${(value) => formatTime(value)}
        disabled=${!duration}
        allowCross=${false}
        onChange=${handleSliderChange}
        onAfterChange=${handleSeek}
      />
    </div>
  `;
}

export default PreviewVideo;
