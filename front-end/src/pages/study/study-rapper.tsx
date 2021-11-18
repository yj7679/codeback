/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { config } from 'config/config';
import SocketClient from 'config/socket';
import Study from './study';
import useStudy from 'hooks/useStudy';
import { msg } from 'util/message';
import { PageLoading } from 'components';

type LocationState = {
  host: boolean;
};

let socket: any;

const StudyRapper = () => {
  const location = useLocation<LocationState>();
  const study = useStudy();
  const history = useHistory();
  const { id }: { id: string } = useParams();
  const [isExistStudy, setIsExistStudy] = useState(false);

  console.log(' 몇번 찍히나?');

  useEffect(() => {
    study
      .verifyStudy(id)
      .then(() => {
        socket = new SocketClient(config.compileApi);
        setIsExistStudy(true);
      })
      .catch((err) => {
        history.push('/');
        msg('Error', err.message);
      });
  }, []);

  if (!isExistStudy) {
    return <PageLoading />;
  }

  return <Study socket={socket} id={id} isHost={location.state ? location.state.host : false} />;
};

export default StudyRapper;
