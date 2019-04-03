import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.css';

const modal = (props) => {
  return (
    <Auxiliary>
      <Backdrop show={true} clicked={props.modalClosed}/>
      <div className={styles.Modal}>
        {props.children}
      </div>
    </Auxiliary>
  );
}

export default modal;