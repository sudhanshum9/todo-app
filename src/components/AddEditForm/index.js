import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { TextField, Button, Checkbox, Stack, InputLabel, Select, MenuItem, Typography, Box } from "@mui/material";
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
    <Box sx={{ p: 4, maxWidth: '500px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? "Edit Task" : "Add New Task"}
      </Typography>
      <form onSubmit={handleSubmit} action={<Link to="/" />}>
        <TextField
          name="name"
          placeholder="Task Name"
          type="text"
          sx={{ mb: 3 }}
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
          sx={{ mb: 3 }}
        />
        <TextField
          name="deadline"
          label="Task Deadline"
          type="date"
          value={task.deadline}
          required
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Checkbox
            name="favorite"
            label="Favorite Task"
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={(e) => setTask((prev) => ({ ...prev, favorite: e.target.checked }))}
            checked={task.favorite || false}
            inputProps={{ 'aria-pressed': task.favorite }}
          />
          <Typography variant="body1">Mark as Favorite</Typography>
        </Box>
        <Stack sx={{ mb: 3 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            name="status"
            labelId="status-label"
            value={task.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </Stack>
        <Button
          data-testid='add-task-button'
          variant="contained"
          color="secondary"
          sx={{ mt: 2, width: '100%' }}
          type="submit"
        >
          {isEditMode ? 'Update' : 'Add'}
        </Button>
      </form>
    </Box>
  );
};

export default AddEditForm;
