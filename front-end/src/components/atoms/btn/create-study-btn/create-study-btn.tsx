import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { msg } from 'util/message';
import { REQUIRE_LOGIN } from 'common/string-template';
import styles from './create-study-btn.module.css';
import useStudy from 'hooks/useStudy';

import useAuth from 'hooks/useAuth';

const CreateStudyBtn = () => {
  const auth = useAuth();
  const study = useStudy();
  const history = useHistory();

  const createStudy = () => {
    if (!auth.authenticated) {
      msg('Error', REQUIRE_LOGIN);
      return;
    }

    study
      .getStudyId()
      .then((studyId) => history.push(`/study/${studyId}`))
      .catch((err) => msg('Error', err.message));
  };

  return (
    <Button className={styles.studyBtn} onClick={createStudy} size="large" shape="round">
      스터디 만들기
    </Button>
  );
};

export default CreateStudyBtn;
