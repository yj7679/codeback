import React from 'react';
import { Button } from 'antd';
import { msg } from 'util/message';
import { COMPLETE_STUDY_URL_COPY } from 'common/string-template';

const UrlCopyBtn = ({ style }: { style?: React.CSSProperties }) => {
  const copyStudyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    msg('Success', COMPLETE_STUDY_URL_COPY);
  };
  return (
    <Button onClick={copyStudyUrl} style={{ ...style }}>
      방 주소
    </Button>
  );
};

export default UrlCopyBtn;
