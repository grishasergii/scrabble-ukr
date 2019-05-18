import React from 'react';
import styles from './FlexRow.css';

const flexRow = (props) => {
  let justifyContent = 'space-around';
  if (props.justifyContent !== undefined && props.justifyContent !== null) {
    justifyContent = props.justifyContent
  }

  const style = {justifyContent: justifyContent};

  return (
    <div className={styles.Container} style={style}>
      {props.children}
    </div>
  );
}

export default flexRow;