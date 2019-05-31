import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../UI/Modal/Modal';
import Spinner from '../UI/Spinner/Spinner';
import { FormattedMessage } from 'react-intl';
import styles from './ComputerPlayer.css';

class ComputerPlayer extends Component {

  componentDidMount() {
    setTimeout(this.props.componentDidMountHandler, 0);
  }

  render() {
    return <Auxiliary>
      <Modal>
        <div className={styles.ComputerPlayer}>
          <Spinner/>
          {<FormattedMessage id='computer-is-thinking' defaultMessage='Computer is thinking' />}...
        </div>
      </Modal>
    </Auxiliary>
  }
}

export default ComputerPlayer;