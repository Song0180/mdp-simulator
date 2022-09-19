import React from 'react';
import GridCell from './GridCell';
import GridLabel from './GridLabel';
import { Button } from 'antd';

import styles from './styles.module.css';

const rowCount = 20;
const colCount = 20;

const Grid = () => {
  const [obstacles, setObstacles] = React.useState(new Map());

  const grid = React.useMemo(() => {
    const initialGrid = [];
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        currentRow.push([row, col]);
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  }, []);

  const handleOnCreateObstacle = (row, col, obstacleFacing) => {
    setObstacles((obstacles) => {
      const newObstacles = new Map(obstacles);
      if (obstacleFacing) {
        newObstacles.set(`${col}, ${row}`, obstacleFacing);
      } else {
        newObstacles.delete(`${col}, ${row}`);
      }
      return newObstacles;
    });
  };

  const handleOnClear = () => {
    setObstacles(new Map());
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <table>
          <tbody className={styles.grid}>
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const [row, col] = node;
                    return (
                      <GridCell
                        key={nodeIdx}
                        col={col}
                        row={row}
                        onClick={handleOnCreateObstacle}
                        obstacleFacing={obstacles.get(`${col}, ${row}`) ?? null}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <GridLabel direction='row' />
        <GridLabel direction='col' />
      </div>

      <div className={styles.info}>
        <h3>Obstacles</h3>

        {Array.from(obstacles).map(([key, value]) => {
          return <div key={key}>{`Obstacle at (${key}) facing ${value}`}</div>;
        })}
        {obstacles.size > 0 && (
          <Button type='primary' danger onClick={handleOnClear}>
            Clear Obstacles
          </Button>
        )}
      </div>
    </div>
  );
};

export default Grid;
