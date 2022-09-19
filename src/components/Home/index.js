import React from 'react';
import styles from './styles.module.css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Button } from 'antd';
import Grid from '../Grid';

const { Dragger } = Upload;

const onUpload = (info) => {
  const { status } = info.file;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const onDrop = (e) => {
  console.log('Dropped files', e.dataTransfer.files);
};

const onClickShow = () => {};

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>MDP Algorithm Simulator</h1>
      <p>Author: Song Yu</p>
      <Grid />
      <Button
        type='primary'
        className={styles.button}
        onClick={onClickShow}
        disabled
      >
        Show Planned Path
      </Button>
      <Dragger
        name='PathResult'
        accept='.json'
        onChange={onUpload}
        onDrop={onDrop}
        className={styles.dragger}
      >
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload the path result json file.
        </p>
      </Dragger>
    </div>
  );
};

export default Home;
