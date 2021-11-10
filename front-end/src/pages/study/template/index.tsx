import React, { ReactNode } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';
import styles from './index.module.css';

type Props = {
  studyHeader: ReactNode;
  editor: ReactNode;
  dataInput: ReactNode;
  dataOutput: ReactNode;
  videoRoom: ReactNode;
};

const StudyTemplate = ({ studyHeader, editor, dataInput, dataOutput, videoRoom }: Props) => (
  <div className={styles.container}>
    <div className={styles.headerContainer}>{studyHeader}</div>
    <div className={styles.contents}>
      <ReflexContainer orientation="vertical">
        <ReflexElement>
          <ReflexContainer orientation="horizontal">
            <ReflexElement flex={0.7}>{editor}</ReflexElement>
            <ReflexSplitter />
            <ReflexElement className="bottom-pane">
              <ReflexContainer orientation="vertical">
                <ReflexElement flex={0.5}>{dataInput}</ReflexElement>
                <ReflexSplitter />
                <ReflexElement>{dataOutput}</ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexSplitter />
        <ReflexElement className="right-pane" maxSize={330}>
          {videoRoom}
        </ReflexElement>
      </ReflexContainer>
    </div>
  </div>
);

export default StudyTemplate;
