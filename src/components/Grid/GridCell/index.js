import React from 'react';
import styles from './styles.module.css';

import cx from 'classnames';

const facing = { 1: 'n', 2: 'e', 3: 's', 4: 'w' };

const GridCell = ({ onClick, row, col }) => {
  const [clickedTimes, setClickedTimes] = React.useState(0);

  const [obstacleFacing, setObstacleFacing] = React.useState(null);

  React.useEffect(() => {
    if (clickedTimes >= 1 && clickedTimes <= 4) {
      setObstacleFacing(facing[clickedTimes % 4]);
    } else {
      setObstacleFacing(null);
    }
  }, [clickedTimes]);

  const handleOnClick = () => {
    onClick();
    setClickedTimes((clickedTimes + 1) % 5);
    console.log('clicked (', row, ', ', col, ')', 'times: ', clickedTimes);
  };

  return (
    <td
      id={`${row}-${col}`}
      className={cx(styles.cell, {
        [styles.startZone]: row >= 16 && col <= 3,
        [styles.n]: obstacleFacing === 'n',
        [styles.e]: obstacleFacing === 'e',
        [styles.s]: obstacleFacing === 's',
        [styles.w]: obstacleFacing === 'w',
      })}
      onClick={handleOnClick}
    />
  );
};

export default GridCell;
