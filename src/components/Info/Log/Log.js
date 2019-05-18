import React from 'react';
import styles from './Log.css';
import Card from '../../UI/Card/Card';

const Log = (props) => {
  const events = props.events.map(x => <p>{x}</p>);
  return (
    <Card heading={'Words played'}>
      <div className={styles.Log}>
        {events}
      </div>
    </Card>
  );
}

export default Log;