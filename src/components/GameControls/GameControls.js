import React from 'react';
import Button from '../UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ButtonWithConfirm from '../../containers/ButtonWithConfirm/ButtonWithConfirm';

const gameControls = (props) => {
  return (
    <Auxiliary>
      <Button 
        clickHandler={props.play}
        disabled={!props.enabled}
        caption='Play'
      />
      <ButtonWithConfirm 
        caption='Pass'
        question='Do you really want to pass?'
        disabled={!props.enabled}
        action={props.pass}
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