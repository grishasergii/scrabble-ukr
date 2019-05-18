import React from 'react';
import Button from '../UI/Button/Button';
import styles from './GameControls.css';

const gameControls = (props) => {
  return (
    <div className={styles.Container}>
      <Button 
        clickHandler={props.play}
        disabled={!props.enabled}
        caption='Play'
      />
      <Button 
        clickHandler={props.pass}
        disabled={!props.enabled}
        caption='Pass'
      />
      <Button 
        clickHandler={props.clear}
        disabled={!props.enabled}
        caption='Clear'
      />
      <Button 
        clickHandler={props.swap}
        disabled={!props.enabled}
        caption='Swap'
      />
    </div>
  );
}

export default gameControls;