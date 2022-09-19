import React from 'react';
import styles from './styles.module.css';

import { Button, Input, message } from 'antd';
import Grid from '../Grid';

const { TextArea } = Input;

const Home = () => {
  const [pathStr, setPathStr] = React.useState('');
  const [pathSet, setPathSet] = React.useState(new Set());

  console.log('pathSet', pathSet);

  const onClickShow = () => {
    try {
      const pathObj = JSON.parse(pathStr);
      console.log('pathObj', pathObj);
      const girdPositions = pathObj.passingGrids;
      console.log('girdPositions', girdPositions);
      for (const position of girdPositions) {
        const [x, y] = position;
        setPathSet((pathSet) => {
          const newPathSet = new Set(pathSet);
          newPathSet.add(`${x},${y}`);
          return newPathSet;
        });
      }
    } catch (e) {
      message.error('Invalid JSON');
    }
  };

  const onClearPath = () => {
    setPathStr('');
    setPathSet(new Set());
  };

  return (
    <div className={styles.home}>
      <h1>MDP Algorithm Simulator</h1>
      <p>Author: Song Yu</p>
      <Grid pathData={pathSet} />
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
