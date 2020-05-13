import React, { useState, useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import gridStyles from './gridStyles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/ReplayOutlined';
import CurrentQuestionContext from './CurrentQuestionContext';
import auth from '../auth';

export default function QuestionSelector(props) {
  const classes = gridStyles();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useContext(CurrentQuestionContext);

  const authToken = auth.getToken();

  useEffect(() => {
    async function getQuestionNumbers() {
      const res = await fetch(`http://localhost:3001/api/question`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      switch (res.status) {
        case 200:
          const result = await res.json();
          const data = result.data;
          setQuestions(data.filter((q) => !q.isDone).map((q) => q.qno));
          break;
        default:
          console.log(await res.json());
          break;
      }
    }
    getQuestionNumbers();
  }, [authToken, currentQuestion]);

  const handleChange = async (e) => {
    const qno = parseInt(e.target.value);
    const res = await fetch(`http://localhost:3001/api/question/${qno}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    switch (res.status) {
      case 200:
        const result = await res.json();
        const data = result.data;
        let { isDone, qno, question, options } = data;
        setCurrentQuestion(
          Object.assign({}, currentQuestion, { isDone: isDone, qno: qno, question: question, options: options })
        );
        break;
      default:
        console.log(await res.json());
        break;
    }
  };
  const handleDelete = async () => {
    const qno = currentQuestion.qno;
    await fetch(`http://localhost:3001/api/question/${qno}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ isDone: true }),
    });
    setCurrentQuestion(Object.assign({}, currentQuestion, { qno: 0, isDone: true }));
  };
  const handleReset = async () => {
    await fetch(`http://localhost:3001/api/question`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ isDone: false }),
    });
    setCurrentQuestion(Object.assign({}, currentQuestion, { qno: 0, isDone: true }));
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Select
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={currentQuestion.qno}
            onChange={handleChange}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            {questions.map((question) => (
              <MenuItem key={question} value={question}>
                Question {question}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select question</FormHelperText>
        </FormControl>
        <br />
        <br />
        {currentQuestion.qno ? (
          <Chip
            label={`currentQuestion  ${currentQuestion.qno}`}
            onDelete={handleDelete}
            color="primary"
            variant="outlined"
          />
        ) : (
          ``
        )}
        <br />
        <Tooltip title="Reset">
          <IconButton onClick={handleReset}>
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
  );
}
