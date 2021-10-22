import React from 'react';
import { Button } from 'antd';
import { msg } from 'util/message';
import { REQUIRE_LOGIN } from 'common/string-template';

const CreateStudyBtn = () => {
  const createStudy = () => {
    const authenticated = false;
    if (authenticated) {
      msg('Error', REQUIRE_LOGIN);
      return;
    }

    msg('Success', '방 만들기 성공');
  };

  return (
    <Button onClick={createStudy} size="large">
      스터디 만들기
    </Button>
  );
};

export default CreateStudyBtn;
