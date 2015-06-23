exports.createNote = function(on, channel, key, velocity) {
  return [(on ? 0x90 : 0x80) | (channel & 0x0F), key & 0x7F, velocity & 0x7F];
};
