import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../UI/Modal/Modal';
import Spinner from '../UI/Spinner/Spinner';

class ComputerPlayer extends Component {

  componentDidMount() {
    setTimeout(this.props.componentDidMountHandler, 0);
  }

  render() {
    return <Auxiliary>
      <Modal><Spinner/>Computer is thinking...</Modal>
    </Auxiliary>
  }
}

export default ComputerPlayer;