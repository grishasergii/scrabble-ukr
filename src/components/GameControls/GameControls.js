import React from 'react';
import Button from '../UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const gameControls = (props) => {
  return (
    <Auxiliary>
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
    </Auxiliary>
  );
}

export default gameControls;