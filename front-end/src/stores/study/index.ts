import { createContext } from 'react';
import { StudyImpl } from './store/study';

export const study = new StudyImpl();
export const StudyContext = createContext(study);
export const StudyProvider = StudyContext.Provider;
