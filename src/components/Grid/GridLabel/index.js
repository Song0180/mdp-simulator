import React from 'react';
import styles from './styles.module.css';
import cx from 'classnames';
const GridLabels = ({ direction }) => {
  return (
    <div className={cx(styles[direction], styles.container)}>
      {[...Array(20)].map((_, i) => {
        return (
          <span className={styles.number} key={direction + i}>
            {i}
          </span>
        );
      })}
    </div>
  );
};

export default GridLabels;
