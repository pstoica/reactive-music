var midi = require('./midi');

module.hot.accept();

navigator
  .requestMIDIAccess()
  .then(access => {
    let outputs = [...access.outputs];
    let OP1 = outputs.filter(output => {
      return output[1].name.startsWith('OP-1');
    })[0][1];

    let now = window.performance.now();

    OP1.send(midi.createNote(true, 0, 60, 127), now);
    OP1.send(midi.createNote(false, 0, 60, 127), now + 500);

    OP1.send(midi.createNote(true, 0, 62, 127), now + 1000);
    OP1.send(midi.createNote(false, 0, 62, 127), now + 1500);
  })
  .catch(::console.error);
