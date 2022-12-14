import React from 'react';
import { Button, message } from 'antd';

import GridCell from './GridCell';
import GridLabel from './GridLabel';

import styles from './styles.module.css';

const rowCount = 20;
const colCount = 20;

const initialRobotGrid = [1, 1];

const Grid = ({ pathData, obstacleData }) => {
  const [obstacles, setObstacles] = React.useState(new Map());
  const [path, setPath] = React.useState([]);
  const [runAnimation, setRunAnimation] = React.useState(false);
  const [currentRobotGrid, setCurrentRobotGrid] =
    React.useState(initialRobotGrid);

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

  React.useEffect(() => {
    if (runAnimation) {
      for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
          setCurrentRobotGrid(path[i]);
          if (i === path.length - 1) {
            message.success('Last obstacle is visited!');
          }
        }, 600 * (i + 1));
      }
      setRunAnimation(false);
    }
  }, [path, runAnimation]);

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

  const handleRunAnimation = () => {
    setRunAnimation(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
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
                          isRobot={
                            col === currentRobotGrid[0] &&
                            row === currentRobotGrid[1]
                          }
                          isPath={path.some(
                            (path) => path[0] === col && path[1] === row
                          )}
                          onClick={handleOnCreateObstacle}
                          obIdentifier={
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
        </div>
        <GridLabel direction='row' />
        <GridLabel direction='col' />
        <Button
          type='primary'
          onClick={handleRunAnimation}
          disabled={path.length === 0}
          className={styles.animateButton}
        >
          Run animation
        </Button>
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
