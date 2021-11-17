/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { config } from 'config/config';
import SocketClient from 'config/socket';
import Study from './study';

import useStudy from 'hooks/useStudy';
import { msg } from 'util/message';

type LocationState = {
  host: boolean;
};

const StudyRapper = observer(() => {
  const socket = new SocketClient(config.compileApi);
  const location = useLocation<LocationState>();
  const study = useStudy();
  const { id }: { id: string } = useParams();
  const [isExistStudy, setIsExistStudy] = useState(false);
  const history = useHistory();

  useEffect(() => {
    study
      .verifyStudy(id)
      .then(() => setIsExistStudy(true))
      .catch((err) => {
        history.push('/');
        msg('Error', err.message);
      });
  }, [study, id, location.state]);

  if (!isExistStudy) {
    return <div style={{ margin: 'auto' }}>존재하지 않는 스터디입니다.</div>;
  }

  return <Study socket={socket} id={id} isHost={location.state ? location.state.host : false}/>;
});

export default StudyRapper;
