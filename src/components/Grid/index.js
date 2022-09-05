import React from 'react';
import GridCell from './GridCell';

import styles from './styles.module.css';

const rowCount = 20;
const colCount = 20;

const Grid = () => {
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

  const handleOnCreateObstacle = () => {};

  return (
    <div className={styles.container}>
      <table className='grid-container'>
        <tbody className='grid'>
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
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
