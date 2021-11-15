/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import StudyTemplate from './template';
import { DataInput, DataOutput, Editor, NicknameForm, OpenViduMain, StudyHeader } from 'components';
import useStudy from 'hooks/useStudy';
import useAuth from 'hooks/useAuth';
import { getRandomColor } from 'util/random-color';
import { msg } from 'util/message';
import SocketClient from 'config/socket';
import useEditor from 'hooks/useEditor';
import { OptionType } from 'stores/editor/model/editor-model';

type LocationState = {
  host: boolean;
};

const Study = observer(() => {
  const location = useLocation<LocationState>();
  const history = useHistory();
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
        ({ nickname: _nickname, language }: { nickname: string; language: OptionType }) => {
          editor.language = language;
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
        history.push('/');
        msg('Error', err.message);
      });

    const clear = () => {
      if (location.state && location.state.host) {
        SocketClient.getSocket().emit('roomDeleted');
        SocketClient.close();
        study.leaveStudy().then(() => {
          console.log('방 삭제');
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
