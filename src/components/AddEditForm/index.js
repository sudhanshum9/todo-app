import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { TextField, Button, Checkbox, Stack, InputLabel, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const AddEditForm = ({
  taskDetails,
  setCurrentTask,
  isEditMode,
  setEditMode,
  setOpenModal,
  setTaskList,
}) => {
  const defaultForm = {
    id: "",
    name: "",
    description: "",
    deadline: "",
    favorite: false,
    status: "todo",
  };

  const [task, setTask] = useState(defaultForm);

  useEffect(() => {
    if (isEditMode && taskDetails) {
      setTask(taskDetails);
    }
  }, [taskDetails, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEditMode) {
      setTaskList((prevTasks) => prevTasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      const newTask = { ...task, id: uuidv4() };
      setTaskList((prevTasks) => [...prevTasks, newTask]);
    }

    setOpenModal(false);
    setCurrentTask({});
    setEditMode(false);
  };

  return (
    <React.Fragment>
      <h2>Fill task Details</h2>
      <form onSubmit={handleSubmit} action={<Link to="/" />}>
        <TextField
          name="name"
          placeholder="Task Name"
          type="text"
          sx={{ mb: 4 }}
          variant="outlined"
          color="secondary"
          label="Task Name"
          onChange={handleChange}
          value={task.name}
          fullWidth
          required
        />
        <TextField
          name="description"
          placeholder="Task Description"
          type="text"
          variant="outlined"
          color="secondary"
          label="Description"
          onChange={handleChange}
          value={task.description}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          name="deadline"
          helperText="Task Deadline"
          label="Task Deadline"
          type="date"
          margin="normal"
          value={task.deadline}
          required
          onChange={handleChange}
        />
        <Checkbox
          name="favorite"
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          onChange={(e) => setTask((prev) => ({ ...prev, favorite: e.target.checked }))}
          checked={task.favorite || false}
        />
        <Stack>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            name="status"
            labelId="status-label"
            value={task.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </Stack>
        <Button
          data-testid="add-task-button"
          variant="outlined"
          color="secondary"
          sx={{ mt: 4 }}
          type="submit"
        >
          {isEditMode ? 'Update' : 'Add'}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddEditForm;