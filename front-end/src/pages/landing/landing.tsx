import React from 'react';
import LandingTemplate from './template';
import { MainHeader, LogoTitle, CreateStudyBtn } from 'components';

const Landing = () => (
  <LandingTemplate
    header={<MainHeader />}
    logoTitle={<LogoTitle />}
    createStudyBtn={<CreateStudyBtn />}
  />
);

export default Landing;
