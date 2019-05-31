import React from 'react';
import Button from '../UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ButtonWithConfirm from '../../containers/ButtonWithConfirm/ButtonWithConfirm';
import { FormattedMessage } from 'react-intl';

const gameControls = (props) => {
  return (
    <Auxiliary>
      <Button 
        clickHandler={props.play}
        disabled={!props.enabled}
        caption={<FormattedMessage id='play' defaultMessage='Play' />}
      />
      <ButtonWithConfirm 
        caption={<FormattedMessage id='pass' defaultMessage='Pass' />}
        question={<FormattedMessage id='pass-confirm' defaultMessage='Do you really want to pass?' />}
        disabled={!props.enabled}
        action={props.pass}
      />
      <Button 
        clickHandler={props.clear}
        disabled={!props.enabled}
        caption={<FormattedMessage id='clear' defaultMessage='Clear' />}
      />
      <Button 
        clickHandler={props.swap}
        disabled={!props.enabled}
        caption={<FormattedMessage id='swap' defaultMessage='Swap' />}
      />
    </Auxiliary>
  );
}

export default gameControls;