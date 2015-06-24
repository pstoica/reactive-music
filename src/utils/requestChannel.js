export default function requestChannel(deviceName) {
  const promise = navigator
    .requestMIDIAccess()
    .then(access => {
      const outputs = [...access.outputs];
      const device = outputs.filter(output => {
        return output[1].name.indexOf(deviceName) >= 0;
      })[0][1];

      return Promise.resolve(device);
    });

  return Rx.Observable.fromPromise(promise);
}

