import React from 'react';
import { Button } from 'antd';

import GridCell from './GridCell';
import GridLabel from './GridLabel';
import Robot from '../Robot';

import styles from './styles.module.css';

const rowCount = 20;
const colCount = 20;

const Grid = ({ pathData, obstacleData }) => {
  const [obstacles, setObstacles] = React.useState(new Map());
  const [path, setPath] = React.useState(new Set());

  React.useEffect(() => {
    if (obstacleData) {
      setObstacles(obstacleData);
    } else {
      handleOnClear();
    }
  }, [obstacleData]);

  React.useEffect(() => {
    if (pathData) {
      setPath(pathData);
    }
  }, [pathData]);

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
        newObstacles.set(`${col}, ${row}`, { facing: obstacleFacing });
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
                        isPath={path.has(`${col},${row}`)}
                        onClick={handleOnCreateObstacle}
                        obNumber={
                          obstacles.get(`${col}, ${row}`)
                            ? obstacles.get(`${col}, ${row}`).obNumber
                            : null
                        }
                        obstacleFacing={
                          obstacles.get(`${col}, ${row}`)
                            ? obstacles.get(`${col}, ${row}`).facing
                            : null
                        }
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
        <Robot />
      </div>

      <div className={styles.info}>
        <h3>Obstacles</h3>

        {Array.from(obstacles).map(([key, value]) => {
          return (
            <div key={key}>{`Obstacle at (${key}) facing ${value.facing}`}</div>
          );
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
