import React, { useState, useEffect } from 'react';
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

export default function QuestionSelector(props) {
  const classes = gridStyles();
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/fetch/questions')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const questionNumbers = data.questions.filter((q) => !q.isDone).map((q) => q.qNo);
          setQuestions(questionNumbers);
        }
      });
  }, [selected]);

  const handleChange = (e) => {
    fetch(`http://localhost:3001/feed/setcurrentquestion/${selected}`, { method: 'POST' });
    setSelected(e.target.value);
    props.setCurrentQues(e.target.value);
  };
  const handleDelete = () => {
    fetch(`http://localhost:3001/feed/markquesasdone/${selected}`, { method: 'POST' });
    setSelected(0);
    props.setCurrentQues(0);
  };
  const handleReset = async () => {
    fetch(`http://localhost:3001/feed/resetquesdone`, { method: 'POST' });
    setSelected(0);
    props.setCurrentQues(0);
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
            value={selected}
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
        {selected ? (
          <Chip label={`Selected Question ${selected}`} onDelete={handleDelete} color="primary" variant="outlined" />
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
