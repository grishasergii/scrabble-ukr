import React from 'react';
import styles from './Card.css';

const Card = (props) => {
  let heading = null;
  if (props.heading !== undefined && props.heading !== null) {
    heading = <h1>{props.heading}</h1>;
  } 
  return (
    <div className={styles.Card}>
      {heading}
      {props.children}
    </div>
  );
}

export default Card;