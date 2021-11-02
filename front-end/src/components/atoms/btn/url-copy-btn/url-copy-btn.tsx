import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { config } from 'config/config';
import { msg } from 'util/message';
import { COMPLETE_STUDY_URL_COPY } from 'common/string-template';

const UrlCopyBtn = ({ style }: { style?: React.CSSProperties }) => {
  const location = useLocation();
  const copyStudyUrl = () => {
    navigator.clipboard.writeText(`${config.api.slice(0, 24)}${location.pathname}`);
    msg('Success', COMPLETE_STUDY_URL_COPY);
  };
  return (
    <Button onClick={copyStudyUrl} style={{ ...style }}>
      방 주소
    </Button>
  );
};

export default UrlCopyBtn;
