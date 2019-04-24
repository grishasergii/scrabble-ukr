import React from 'react';

const gameControls = (props) => {
  return (
    <div>
      <button onClick={props.play} disabled={!props.enabled}>Play</button>
      <button onClick={props.pass} disabled={!props.enabled}>Pass</button>
      <button onClick={props.clear} disabled={!props.enabled}>Clear</button>
      <button onClick={props.swap} disabled={!props.enabled}>Swap</button>
    </div>
  );
}

export default gameControls;