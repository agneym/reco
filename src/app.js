const fs = require("fs");
const ffmpeg = require("ffmpeg.js/ffmpeg-mp4.js");

const testData = new Uint8Array(fs.readFileSync("src/test.webm"));
// Encode test video to VP8.
const result = ffmpeg({
  MEMFS: [{name: "test.webm", data: testData}],
  arguments: ["-y", "-i", "test.webm", "-c:v", "copy", "out.mp4"],
});
// Write out.webm to disk.
const out = result.MEMFS[0];
fs.writeFileSync(out.name, Buffer(out.data));
