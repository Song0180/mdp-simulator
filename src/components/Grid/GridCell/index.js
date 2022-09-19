import React from 'react';
import styles from './styles.module.css';

import cx from 'classnames';

const facing = { 1: 'north', 2: 'east', 3: 'south', 4: 'west' };

const isStartZone = (row, col) => {
  return row <= 3 && col <= 3;
};

const GridCell = ({
  onClick,
  row,
  col,
  obstacleFacing = null,
  isPath = false,
  obNumber = null,
}) => {
  const [clickedTimes, setClickedTimes] = React.useState(0);

  const handleOnClick = () => {
    if (!isStartZone(row, col)) {
      setClickedTimes((clickedTimes + 1) % 5);
      onClick(row, col, facing[(clickedTimes + 1) % 5] ?? null);
    }
  };

  const handleOnRightClick = (e) => {
    e.preventDefault();
    setClickedTimes(0);
    onClick(row, col, null);
  };

  return (
    <td
      id={`${row}-${col}`}
      className={cx(styles.cell, {
        [styles.startZone]: isStartZone(row, col),
        [styles.obstacle]: obstacleFacing !== null,
        [styles.path]: isPath,
      })}
      onClick={handleOnClick}
      onContextMenu={handleOnRightClick}
    >
      <div
        className={cx(styles.innerDiv, {
          [styles.n]: obstacleFacing === 'north',
          [styles.e]: obstacleFacing === 'east',
          [styles.s]: obstacleFacing === 'south',
          [styles.w]: obstacleFacing === 'west',
        })}
      >
        {obNumber}
      </div>
    </td>
  );
};

export default GridCell;
