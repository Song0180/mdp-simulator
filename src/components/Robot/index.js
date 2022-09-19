import React from 'react';

import styles from './styles.module.css';

const Robot = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={process.env.PUBLIC_URL + '/robot.png'}
        alt='robot'
      />
    </div>
  );
};

export default Robot;
