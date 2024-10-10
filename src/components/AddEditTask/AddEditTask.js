import { clone } from "lodash";
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
        status: 'todo'
    };
    const [task, setTask] = useState(defaultForm);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEditMode) {
            // Update the existing task
            setTaskList((prev) => prev.map((t) => (t.id === task.id ? task : t)));
        } else {
            // Create a new task
            const _newtask = {
                ...task,
                id: uuidv4(), // Generate a unique ID for a new task
            };
            setTaskList((prev) => [...prev, _newtask]);
        }

        setOpenModal(false);
        setCurrentTask({});
        setEditMode(false);
    };

    useEffect(() => {
        if (isEditMode && taskDetails) {
            const { id, name, description, deadline, favorite, status } = taskDetails;

            const _task = {
                id,
                name,
                description,
                deadline,
                favorite,
                status
            };
            setTask(_task);
        }
    }, [taskDetails, isEditMode]);

    const onChangeName = (value: string) => {
        const _task = clone(task);
        _task.name = value;
        setTask(_task);
    };
    const onChangeDescription = (value: string) => {
        const _task = clone(task);
        _task.description = value;
        setTask(_task);
    };
    const onChangeDeadline = (value: string) => {
        const _task = clone(task);
        _task.deadline = value;
        setTask(_task);
    };
    const onChangeFavorite = (value: string) => {
        console.log({ value })
        const _task = clone(task);
        _task.favorite = value;
        setTask(_task);
    };

    const onChangeStatus = (value: string) => {
        console.log({ value })
        const _task = clone(task);
        _task.status = value;
        setTask(_task);
    };


    return (
        <React.Fragment>
            <h2>Fill task Details</h2>
            <form onSubmit={handleSubmit} action={<Link to="/" />}>
                <TextField
                    placeholder="name"  // Add name attribute
                    type="text"
                    sx={{ mb: 4 }}
                    variant="outlined"
                    color="secondary"
                    label="Task Name"
                    onChange={(e) => onChangeName(e.target.value)}
                    value={task?.name}
                    fullWidth
                    required
                />
                <TextField
                    placeholder="description"  // Add name attribute
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Description"
                    sx={{ mb: 4 }}
                    onChange={(e) => onChangeDescription(e.target.value)}
                    value={task?.description}
                    fullWidth
                    required
                />
                <TextField
                    helperText="task deadline"
                    placeholder="deadline"  // Add name attribute
                    type="date"
                    margin="normal"
                    value={task?.deadline}
                    required
                    onChange={(e) => onChangeDeadline(e.target.value)}
                />
                <Checkbox
                    placeholder="favorite"  // Add name attribute
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={(e) => onChangeFavorite(e.target.checked)}
                    checked={task?.favorite || false}
                />
                <Stack>
                    <InputLabel id="select-label">Status</InputLabel>
                    <Select
                        placeholder="status"  // Add name attribute
                        labelId="select-label"
                        id="demo-simple-select"
                        value={task?.status}
                        label="Status"
                        onChange={(e) => onChangeStatus(e.target.value)}
                    >
                        <MenuItem value={'todo'}>To Do</MenuItem>
                        <MenuItem value={'inProgress'}>In Progress</MenuItem>
                        <MenuItem value={'done'}>Done</MenuItem>
                    </Select>
                </Stack>
                <Button
                    data-testid='add-task-button'
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 4 }}
                    type="submit"
                >
                    Add
                </Button>
            </form>
        </React.Fragment>
    );
};

export default AddEditForm;
