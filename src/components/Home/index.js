import React from 'react';
import styles from './styles.module.css';

import Grid from '../Grid';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>MDP Algorithm Simulator</h1>
      <Grid />
      <div>Author: Song Yu</div>
    </div>
  );
};

export default Home;
