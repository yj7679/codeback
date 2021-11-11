import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import StudyTemplate from './template';
import { DataInput, DataOutput, Editor, NicknameForm, OpenViduMain, StudyHeader } from 'components';
import useStudy from 'hooks/useStudy';
import useAuth from 'hooks/useAuth';
import { getRandomColor } from 'util/random-color';
import { msg } from 'util/message';
import SocketClient from 'config/socket';

const Study = observer(() => {
  const { info } = useAuth();
  const study = useStudy();
  const { id }: { id: string } = useParams();
  const [nickname, setNickname] = useState<string | undefined>(undefined);
  const [isExistStudy, setIsExistStudy] = useState(false);

  useEffect(() => {
    study
      .verifyStudy(id)
      .then(() => setIsExistStudy(true))
      .catch((err) => {
        history.go(-1);
        msg('Error', err.message);
      });

    return () => {
      study.leaveStudy();
      SocketClient.close();
    };
  }, [study, id]);

  useEffect(() => {
    if (info != null) {
      setNickname(info.nickname);
    }
  }, [info]);

  useEffect(() => {
    try {
      SocketClient.connect(id);
    } catch (err) {
      msg('Error', '소켓 연결 실패');
    }
  }, [id]);

  if (!isExistStudy) {
    return <div style={{ margin: 'auto' }}>존재하지 않는 스터디입니다.</div>;
  }

  return (
    <>
      {nickname ? (
        <StudyTemplate
          studyHeader={<StudyHeader />}
          editor={<Editor cellId={id} userName={nickname} cursorColor={getRandomColor()} />}
          dataInput={<DataInput />}
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
