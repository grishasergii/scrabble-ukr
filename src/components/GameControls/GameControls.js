import React from 'react';
import Button from '../UI/Button/Button';

const gameControls = (props) => {
  return (
    <div>
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