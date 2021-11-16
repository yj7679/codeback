import React, { ReactNode, useEffect, useRef } from 'react';
import styles from './index.module.css';
import allGif from 'assets/imgs/codeback-all.gif';
import camGif from 'assets/imgs/codeback-cam.gif';
import codeGif from 'assets/imgs/codeback-code.gif';
import { Button } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

type Props = {
  header: ReactNode;
  logoTitle: ReactNode;
  createStudyBtn: ReactNode;
};

const LandingTemplate = ({ header, logoTitle, createStudyBtn }: Props) => {
  const guideRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {}, []);
  return (
    <div className={styles.container2}>
      {header}
      <div className={styles.container}>
        <div className={styles.logoTitleContainer}>{logoTitle}</div>
        <div>{createStudyBtn}</div>

        <Button
          onClick={() => {
            guideRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          size="large"
          shape="round"
          style={{ marginTop: '2em', backgroundColor: 'transparent', color: 'whitesmoke' }}>
          서비스 소개
        </Button>
      </div>

      <h1
        ref={guideRef}
        style={{
          fontFamily: 'logoFont',
          color: 'whitesmoke',
          textAlign: 'center',
          marginBottom: '5em'
        }}>
        Codeback에 대해서 알아볼까요?
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: 'auto',
          width: '70em'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10em' }}>
          <div>
            <h1 style={{ fontFamily: 'titleFont', color: 'whitesmoke' }}>화상 회의</h1>
            <p style={{ color: 'whitesmoke', fontSize: '1.2rem' }}>
              화상 회의로 스터디에 생동감을 불어넣을 수 있어요!
            </p>
          </div>
          <img src={camGif} className={styles.camGif} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            marginBottom: '10em'
          }}>
          <div style={{ textAlign: 'right', width: '15em' }}>
            <h1 style={{ fontFamily: 'titleFont', color: 'whitesmoke' }}>실시간 코드 수정</h1>
            <p style={{ color: 'whitesmoke', fontSize: '1.2rem', textAlign: 'left' }}>
              실시간으로 친구들과 코드를 수정할 수 있어요!
            </p>
          </div>
          <img src={codeGif} className={styles.codeGif} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10em' }}>
          <div style={{ width: '16em' }}>
            <h1 style={{ fontFamily: 'titleFont', color: 'whitesmoke' }}>실시간 컴파일</h1>
            <p style={{ color: 'whitesmoke', fontSize: '1.2rem' }}>
              친구들과 작성한 코드를 실시간으로 컴파일해서 확인해볼 수 있어요!
            </p>
          </div>
          <img src={allGif} className={styles.allGif} />
        </div>
      </div>

      <h1
        style={{
          fontFamily: 'logoFont',
          color: 'whitesmoke',
          textAlign: 'center',
          marginBottom: '3em'
        }}>
        이제 시작해볼까요?
      </h1>
      <div style={{ textAlign: 'center', marginBottom: '10em' }}>
        <UpCircleOutlined
          onClick={() =>
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })
          }
          style={{ color: 'whitesmoke', fontSize: '2rem' }}
        />
      </div>
    </div>
  );
};

export default LandingTemplate;
