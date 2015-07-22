import µ from 'utils';

const debuggerDevice = {
  send(note, time) {
    console.debug(`note: ${note}`, `time: ${time}`);
  }
};

export default function requestChannel(deviceName = 'DEBUGGER') {
  const devicePromise = deviceName === 'DEBUGGER'
    ? Promise.resolve(debuggerDevice)
    : navigator.requestMIDIAccess()
        .then(access => {
          const outputs = [...access.outputs];
          const device = outputs.filter(output => {
            return output[1].name.indexOf(deviceName) >= 0;
          })[0][1];

          return device;
        });

  return Obs.fromPromise(
    devicePromise.then(device => {
      const subject = new Rx.Subject();

      subject.subscribe(({ note, time }) => device.send(
        µ.midi.createNote(note),
        time
      ));

      return Promise.resolve(subject);
    }).catch(err => console.log(err))
  );
}

