import React from 'react';
import Card from '../UI/Card/Card';
import { FormattedMessage } from 'react-intl';
import ToggleButton from '../UI/ToggleButton/ToggleButton';
import styles from './GameSettings.css';

const gameSettings = (props) => {
  return (
    <Card heading={<FormattedMessage id='game-settings' defaultMessage='Game settings'/>}>
      <div className={styles.GameSettings}>
        <span>
        {<FormattedMessage id='set-board-to' defaultMessage='Set board to'/>}: &nbsp;
        <ToggleButton 
            handler={props.toggleBoardTypeHandler}
            isToggleOn={true}
            captionOn={<FormattedMessage id='random' defaultMessage='Random'/>}
            captionOff={<FormattedMessage id='standard' defaultMessage='Standard'/>}
          />
          </span>
        <ToggleButton 
          handler={props.toggleLangHandler}
          isToggleOn={true}
          captionOn='in English'
          captionOff='Українською'
        />
      </div>
    </Card>
  );
}

export default gameSettings;