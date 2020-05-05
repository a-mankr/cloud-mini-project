import { createContext } from 'react';

const CurrentQuestionContext = createContext([{ isDone: false, qNo: 0 }, (obj) => obj]);

export default CurrentQuestionContext;
