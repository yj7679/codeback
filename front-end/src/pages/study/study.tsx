import React from 'react';
import { useParams } from 'react-router-dom';
import StudyTemplate from './template';
import { Editor, StudyHeader } from 'components';
import { getRandomColor } from 'util/random-color';

const Study = () => {
  const { id }: { id: string } = useParams();
  console.log(id);

  return (
    <StudyTemplate
      studyHeader={<StudyHeader />}
      editor={<Editor cellId={id} userName="jun" cursorColor={getRandomColor()} />}
    />
  );
};

export default Study;
