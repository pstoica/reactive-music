exports.createNote = function({
  on = true,
  channel = 0,
  key = 60,
  velocity = 127
}) {
  return [
    (on ? 0x90 : 0x80) | (channel & 0x0F),
    key & 0x7F,
    velocity & 0x7F
  ];
};
