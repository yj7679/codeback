import React, { ReactNode } from 'react';
import { CssKeyObject } from 'types/common';

const styles: CssKeyObject = {
  container: {}
};

type Props = {
  studyHeader: ReactNode;
  editor: ReactNode;
};

const StudyTemplate = ({ studyHeader, editor }: Props) => (
  <div style={styles.container}>
    <div>{studyHeader}</div>
    <div>{editor}</div>
  </div>
);

export default StudyTemplate;
