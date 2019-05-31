import React from 'react';
import Card from '../UI/Card/Card';
import { FormattedMessage } from 'react-intl';
import ToggleButton from '../UI/ToggleButton/ToggleButton';
import styles from './GameSettings.css';

const gameSettings = (props) => {
  return (
    <Card heading={<FormattedMessage id='game-settings' defaultMessage='Game settings'/>}>
      <div className={styles.GameSettings}>
        <br></br>
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