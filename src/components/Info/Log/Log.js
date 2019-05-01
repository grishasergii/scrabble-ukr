import React from 'react';
import styles from './Log.css';

const Log = (props) => {
  const events = props.events.map(x => <p>{x}</p>);
  return (
    <div className={styles.Log}>
      <h1>Game events:</h1>
      {events}
    </div>
  );
}

export default Log;