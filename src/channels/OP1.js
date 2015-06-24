U.requestChannel('OP-1').subscribe(
  (m) => {
    Rx.Observable
      .merge(
        $a,
        $b
      )
      .subscribe(
        ({ time, ...note }) => {
          //console.log(note, time);
          m.send(U.midi.createNote(note), time);
        }
      );
  },
  (e) => ::console.error
);
