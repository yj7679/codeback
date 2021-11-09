import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudyTemplate from './template';
import { DataInput, DataOutput, Editor, NicknameForm, StudyHeader } from 'components';
import { getRandomColor } from 'util/random-color';
import useStudy from 'hooks/useStudy';

const Study = () => {
  const study = useStudy();
  const { id }: { id: string } = useParams();

  useEffect(() => {
    return () => {
      study.leaveStudy();
    };
  }, [study]);

  const [nickname, setNickname] = useState<string | undefined>(undefined);

  return (
    <>
      {nickname ? (
        <StudyTemplate
          studyHeader={<StudyHeader />}
          editor={<Editor cellId={id} userName={nickname} cursorColor={getRandomColor()} />}
          dataInput={<DataInput />}
          dataOutput={<DataOutput />}
        />
      ) : (
        <div style={{ margin: 'auto' }}>
          <NicknameForm setNickname={setNickname} />
        </div>
      )}
    </>
  );
};

export default Study;
