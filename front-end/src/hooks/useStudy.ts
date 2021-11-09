import { useContext } from 'react';
import { StudyContext } from 'stores/study';

const useStudy = () => {
  const studyContext = useContext(StudyContext);
  return studyContext;
};

export default useStudy;
