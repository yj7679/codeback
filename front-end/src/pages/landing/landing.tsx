import React from 'react';
import LandingTemplate from './template';
import { CreateStudyBtn, MainHeader } from 'components';

const Landing = () => (
  <LandingTemplate header={<MainHeader />} createStudyBtn={<CreateStudyBtn />} />
);

export default Landing;
