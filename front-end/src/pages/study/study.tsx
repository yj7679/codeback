import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import StudyTemplate from './template';
import { DataInput, DataOutput, Editor, NicknameForm, OpenViduMain, StudyHeader } from 'components';
import useAuth from 'hooks/useAuth';
import { getRandomColor } from 'util/random-color';
import { msg } from 'util/message';
import useEditor from 'hooks/useEditor';
import { OptionType } from 'stores/editor/model/editor-model';
import useStudy from 'hooks/useStudy';

const Study = observer(({ socket, id, isHost }: { socket: any; id: string; isHost: boolean }) => {
  const { info } = useAuth();
  const editor = useEditor();
  const study = useStudy();
  const [nickname, setNickname] = useState<string | undefined>(undefined);

  useEffect(() => {
    const clear = () => {
      if (isHost) {
        socket.getSocket().emit('roomDeleted');
        socket.close();
        study.leaveStudy();
      } else {
        socket.close();
      }
    };

    window.addEventListener('beforeunload', clear);
    window.removeEventListener('unload', clear);

    return () => {
      clear();
    };
  }, [isHost, socket, study]);

  useEffect(() => {
    if (nickname == null) return;
    socket.join(id, nickname);
    try {
      socket.io.on(
        'join',
        ({ nickname: _nickname, language }: { nickname: string; language: OptionType }) => {
          editor.language = language;
          msg('Success', `${_nickname}님이 입장하셨습니다.`);
        }
      );

      socket.io.on('leave', ({ nickname: _nickname }: { nickname: string }) => {
        msg('Success', `${_nickname}님이 퇴장하셨습니다.`);
      });
    } catch (err) {
      msg('Error', '소켓 연결 실패');
    }
  }, [id, nickname, editor, socket]);

  useEffect(() => {
    if (info != null) {
      setNickname(info.nickname);
    }
  }, [info]);

  return (
    <>
      {nickname ? (
        <StudyTemplate
          studyHeader={<StudyHeader socket={socket} />}
          editor={<Editor cellId={id} userName={nickname} cursorColor={getRandomColor()} />}
          dataInput={
            <DataInput cellId={id + 'input'} userName={nickname} cursorColor={getRandomColor()} />
          }
          dataOutput={<DataOutput socket={socket} />}
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
