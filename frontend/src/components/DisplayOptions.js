import React, { useState, useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import gridStyles from './gridStyles';
import CurrentQuestionContext from './CurrentQuestionContext';

export default function QuestionSelector(props) {
  const classes = gridStyles();
  const [currentQuestion] = useContext(CurrentQuestionContext);
  const [options, setOptions] = useState([]);

  const handleClear = () => {
    setOptions([]);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/fetch/question/${currentQuestion.qNo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const options = data.question && data.question.question && data.question.question.correctoptions;
          setOptions(options || []);
        }
      })
      .catch(console.log);
    return handleClear;
  }, [currentQuestion.qNo]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        Options for Question no.: {currentQuestion.qNo} <br />
        {options.map((option) => (
          <div key={option.optionNo}>
            {option.optionNo}. {option.option}
          </div>
        ))}
      </Paper>
    </div>
  );
}
