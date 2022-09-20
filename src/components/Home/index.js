import React from 'react';
import styles from './styles.module.css';

import { Button, Input, message } from 'antd';
import Grid from '../Grid';

const { TextArea } = Input;

const Home = () => {
  const [pathStr, setPathStr] = React.useState('');
  const [pathSet, setPathSet] = React.useState(new Set());
  const [obstacleMap, setObstacleMap] = React.useState(new Map());

  const onClickShow = () => {
    try {
      const jsonObj = JSON.parse(pathStr);
      const pathGrids = JSON.parse(jsonObj.passingGrids);

      for (const position of pathGrids) {
        const [x, y] = position;
        setPathSet((pathSet) => {
          const newPathSet = new Set(pathSet);
          newPathSet.add(`${x},${y}`);
          return newPathSet;
        });
      }

      const obstacleGrids = JSON.parse(jsonObj.obstacleGrids);
      for (const obstacle of obstacleGrids) {
        const [x, y, facing, obNumber] = obstacle;
        setObstacleMap((obstacleMap) => {
          const newObstacleMap = new Map(obstacleMap);
          newObstacleMap.set(`${x}, ${y}`, { facing, obNumber });
          return newObstacleMap;
        });
      }

      message.success('Path is shown on the grid');
    } catch (e) {
      message.error('Invalid JSON');
    }
  };

  const onClearPath = () => {
    setPathStr('');
    setPathSet(new Set());
    setObstacleMap(new Map());
    message.success('Path is cleared');
  };

  return (
    <div className={styles.home}>
      <h1>MDP Algorithm Simulator</h1>
      <p>Author: Song Yu</p>
      <Grid
        pathData={pathSet}
        obstacleData={obstacleMap.size ? obstacleMap : null}
      />
      <div>
        <Button
          type='primary'
          className={styles.button}
          onClick={onClickShow}
          disabled={!pathStr.length}
        >
          Show Path
        </Button>
        <Button
          type='primary'
          className={styles.button}
          onClick={onClearPath}
          disabled={!pathStr.length}
        >
          Clear Path
        </Button>
      </div>

      <TextArea
        rows={4}
        value={pathStr}
        placeholder='Paste path here (in json format)'
        className={styles.textArea}
        onChange={(e) => setPathStr(e.target.value)}
      />
    </div>
  );
};

export default Home;
