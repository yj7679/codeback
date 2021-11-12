import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useLocation } from 'react-router-dom';
import StudyTemplate from './template';
import { DataInput, DataOutput, Editor, NicknameForm, OpenViduMain, StudyHeader } from 'components';
import useStudy from 'hooks/useStudy';
import useAuth from 'hooks/useAuth';
import { getRandomColor } from 'util/random-color';
import { msg } from 'util/message';
import SocketClient from 'config/socket';
import useEditor from 'hooks/useEditor';

type LocationState = {
  host: boolean;
};

const Study = observer(() => {
  const location = useLocation<LocationState>();
  const { info } = useAuth();
  const editor = useEditor();
  const study = useStudy();
  const { id }: { id: string } = useParams();
  const [nickname, setNickname] = useState<string | undefined>(undefined);
  const [isExistStudy, setIsExistStudy] = useState(false);

  useEffect(() => {
    if (nickname == null) return;
    SocketClient.join(id, nickname);
    try {
      SocketClient.io.on(
        'join',
        ({ nickname: _nickname, language }: { nickname: string; language: string }) => {
          switch (language) {
            case 'JavaScript':
              editor.language = { label: language, value: language };
              break;
            case 'cpp':
              editor.language = { label: 'C++', value: 'C++' };
              break;
            case 'python3':
              editor.language = { label: 'Python', value: 'Python' };
              break;
            case 'java':
              editor.language = { label: 'Java', value: 'Java' };
              break;
          }

          msg('Success', `${_nickname}님이 입장하셨습니다.`);
        }
      );

      SocketClient.io.on('leave', ({ nickname: _nickname }: { nickname: string }) => {
        msg('Success', `${_nickname}님이 퇴장하셨습니다.`);
      });
    } catch (err) {
      msg('Error', '소켓 연결 실패');
    }
  }, [id, nickname, editor]);

  useEffect(() => {
    study
      .verifyStudy(id)
      .then(() => setIsExistStudy(true))
      .catch((err) => {
        history.go(-1);
        msg('Error', err.message);
      });

    const clear = () => {
      if (location.state && location.state.host) {
        study.leaveStudy().then(() => {
          console.log(SocketClient, SocketClient.io);
          SocketClient.getSocket().emit('roomDeleted');
          SocketClient.close();
        });
      } else {
        SocketClient.close();
      }
    };

    window.addEventListener('beforeunload', clear);
    window.removeEventListener('unload', clear);

    return () => {
      clear();
    };
  }, [study, id, location.state]);

  useEffect(() => {
    if (info != null) {
      setNickname(info.nickname);
    }
  }, [info]);

  if (!isExistStudy) {
    return <div style={{ margin: 'auto' }}>존재하지 않는 스터디입니다.</div>;
  }

  return (
    <>
      {nickname ? (
        <StudyTemplate
          studyHeader={<StudyHeader />}
          editor={<Editor cellId={id} userName={nickname} cursorColor={getRandomColor()} />}
          dataInput={
            <DataInput cellId={id + 'input'} userName={nickname} cursorColor={getRandomColor()} />
          }
          dataOutput={<DataOutput />}
          videoRoom={<OpenViduMain roomTitle="1234" pinNumber={id} nickname={nickname} />}
        />
      ) : (
        <div style={{ margin: 'auto' }}>
          <NicknameForm setNickname={setNickname} />
        </div>
      )}
    </>
  );
});

export default Study;
