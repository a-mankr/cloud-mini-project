import { createContext } from 'react';

const CurrentQuestionContext = createContext([
  {
    isDone: false,
    qno: 0,
    question: 'This is a question',
    options: [
      {
        id: 1,
        option: 'Option 1',
      },
      {
        id: 2,
        option: 'Option 2',
      },
      {
        id: 3,
        option: 'Option 3',
      },
      {
        id: 4,
        option: 'Option 4',
      },
      {
        id: 5,
        option: 'Option 5',
      },
      {
        id: 6,
        option: 'Option 6',
      },
      {
        id: 7,
        option: 'Option 7',
      },
      {
        id: 8,
        option: 'Option 8',
      },
      {
        id: 9,
        option: 'Option 9',
      },
      {
        id: 10,
        option: 'Option 10',
      },
    ],
  },
  (obj) => obj,
]);

export default CurrentQuestionContext;
