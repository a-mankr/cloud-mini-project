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

export default function QuestionSelector(props) {
  const classes = gridStyles();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useContext(CurrentQuestionContext);

  useEffect(() => {
    fetch('http://localhost:3001/fetch/questions')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const questionNumbers = data.questions.filter((q) => !q.isDone).map((q) => q.qNo);
          setQuestions(questionNumbers);
        }
      });
  }, [currentQuestion.qNo]);

  const handleChange = (e) => {
    fetch(`http://localhost:3001/feed/setcurrentquestion/${currentQuestion.qNo}`, { method: 'POST' });
    setCurrentQuestion(Object.assign({}, currentQuestion, { qNo: e.target.value }));
  };
  const handleDelete = () => {
    fetch(`http://localhost:3001/feed/markquesasdone/${currentQuestion.qNo}`, { method: 'POST' });
    setCurrentQuestion(Object.assign({}, currentQuestion, { qNo: 0 }));
  };
  const handleReset = async () => {
    fetch(`http://localhost:3001/feed/resetquesdone`, { method: 'POST' });
    setCurrentQuestion(Object.assign({}, currentQuestion, { qNo: 0 }));
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
            value={currentQuestion.qNo}
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
        {currentQuestion.qNo ? (
          <Chip
            label={`currentQuestion  ${currentQuestion.qNo}`}
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
