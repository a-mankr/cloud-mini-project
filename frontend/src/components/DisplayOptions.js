import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import gridStyles from './gridStyles';

export default function QuestionSelector(props) {
  const classes = gridStyles();
  const { currentQues } = props;
  const [options, setOptions] = useState([]);

  const handleClear = () => {
    setOptions([]);
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('token'));
    let token;
    if (auth && auth.authenticated) token = auth.token;
    fetch(`http://localhost:3001/fetch/question/${currentQues}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const options = data.question && data.question.question && data.question.question.correctoptions;
          setOptions(options || []);
        }
      })
      .catch(console.log);
    return handleClear;
  }, [currentQues]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        Options for Question no.: {currentQues} <br />
        {options.map((option) => (
          <div key={option.optionNo}>
            {option.optionNo}. {option.option}
          </div>
        ))}
      </Paper>
    </div>
  );
}
