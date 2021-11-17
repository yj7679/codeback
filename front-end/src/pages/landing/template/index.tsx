/*eslint-disable */
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { BackTop, Button } from 'antd';
import styles from './index.module.css';
import compileGif from 'assets/imgs/codeback-compile.gif';
import camGif from 'assets/imgs/codeback-cam.gif';
import codeGif from 'assets/imgs/codeback-coding.gif';
import joinGif from 'assets/imgs/codeback-join-without-login.gif';
import useAuth from 'hooks/useAuth';
import { CssKeyObject } from 'types/common';
import {
  ArrowDownOutlined,
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined
} from '@ant-design/icons';

const styless: CssKeyObject = {
  header: {
    position: 'fixed',
    width: '100%',
    backgroundColor: 'transparent',
    transition: 'all 200ms ease-in'
  },
  headerFix: {
    position: 'fixed',
    width: '100%',
    backgroundColor: '#e05880',
    transition: 'all 200ms ease-in'
  }
};

type Props = {
  header: ReactNode;
  logoTitle: ReactNode;
  createStudyBtn: ReactNode;
};

const LandingTemplate = observer(({ header, logoTitle, createStudyBtn }: Props) => {
  const auth = useAuth();
  const introduceRef = useRef<HTMLHeadingElement>(null);
  const functionRef = useRef<HTMLHeadingElement>(null);
  const history = useHistory();
  const [darkHeader, setDarkHeader] = useState(false);

  useEffect(() => {
    const scrollEvent = () => {
      if (!darkHeader && window.scrollY > 1) {
        setDarkHeader(true);
      } else {
        setDarkHeader(false);
      }
    };

    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return (
    <div className={styles.container2}>
      <div style={darkHeader ? styless.headerFix : styless.header}>{header}</div>
      <div className={styles.container}>
        <div className={styles.logoTitleContainer}>{logoTitle}</div>
        {auth.authenticated && <div>{createStudyBtn}</div>}
        <Button
          onClick={() => {
            introduceRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          size="large"
          shape="round"
          style={{ marginTop: '2em', backgroundColor: 'transparent', color: 'whitesmoke' }}>
          소개
        </Button>
      </div>

      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5em'
        }}>
        <h1
          ref={introduceRef}
          style={{
            fontFamily: 'logoFont',
            color: 'whitesmoke',
            textAlign: 'center',
            paddingTop: '5em',
            marginBottom: '2em'
          }}>
          코드백의 탄생
        </h1>
        <p style={{ color: 'whitesmoke', fontSize: '1.5rem' }}>
          코딩테스트 스터디를 진행하면서 <br />
          "이렇게 작성하면 더 깔끔하고 좋을 것 같은데 🥺",
          <br />
          "저 밑에 있는 코드가 안보이는데 뭐지? 보고싶어 😞",
          <br />
          "코드 실행 결과 확인해보고 싶은데 번거롭네 😴",
          <br />
          속으로 생각한 적 다들 있지 않나요?
        </p>
        <p style={{ color: 'whitesmoke', fontSize: '1.5rem' }}>
          이런 불편함을 극복하고자 <strong>코드백(코드 + 피드백)</strong>이 탄생했습니다👏
        </p>
        <Button
          onClick={() => {
            functionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          icon={<ArrowDownOutlined />}
          style={{
            marginTop: '3em',
            backgroundColor: 'transparent',
            color: 'whitesmoke'
          }}></Button>
      </div>

      <div
        ref={functionRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: 'auto',
          width: '70em'
        }}>
        <h1
          style={{
            fontFamily: 'logoFont',
            color: 'whitesmoke',
            textAlign: 'center',
            paddingTop: '3em',
            marginBottom: '2em'
          }}>
          기능에 대해서 알아볼까요?
        </h1>
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
            <h1 style={{ fontFamily: 'titleFont', color: 'whitesmoke' }}>컴파일</h1>
            <p style={{ color: 'whitesmoke', fontSize: '1.2rem' }}>
              친구들과 작성한 코드를 바로 실행해서 확인해볼 수 있어요!
            </p>
            <p style={{ color: 'whitesmoke', fontSize: '1.2rem' }}>
              또한, 소켓 통신을 통해 결과값을 동시에 확인할 수 있어요!
            </p>
          </div>
          <img src={compileGif} className={styles.compileGif} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10em' }}>
          <img src={joinGif} className={styles.joinGif} />
          <div style={{ width: '20em' }}>
            <h1 style={{ fontFamily: 'titleFont', color: 'whitesmoke' }}>로그인 없이 입장</h1>
            <p style={{ color: 'whitesmoke', fontSize: '1.2rem' }}>
              회원가입을 하지 않아도 <br />
              바로 입장할 수 있어요!
            </p>
            <p style={{ color: 'whitesmoke', fontSize: '1.2rem' }}>
              하지만, 무분별한 스터디 생성을 <br />
              막기 위해 방장은 회원가입을 <br />꼭 해야한다는 점. 이해해주세요!
            </p>
          </div>
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
        <Button
          onClick={() => history.push('/signup')}
          size="large"
          shape="round"
          style={{ color: '#b24592' }}>
          회원가입하고 시작하기
        </Button>
      </div>
      <footer
        style={{
          backgroundColor: 'black',
          width: '100%',
          height: '10em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <span style={{ color: 'whitesmoke', fontSize: '1rem' }}>Made by ❤ CodeBack</span>
        <div style={{ marginLeft: '1em' }}>
          <GithubOutlined
            style={{
              fontSize: '1.5rem',
              color: 'whitesmoke',
              marginRight: '.3em',
              cursor: 'pointer'
            }}
          />
          <InstagramOutlined
            style={{
              fontSize: '1.5rem',
              color: 'whitesmoke',
              marginRight: '.3em',
              cursor: 'pointer'
            }}
          />
          <FacebookOutlined
            style={{ fontSize: '1.5rem', color: 'whitesmoke', cursor: 'pointer' }}
          />
        </div>
      </footer>
      <BackTop />
    </div>
  );
});

export default LandingTemplate;
