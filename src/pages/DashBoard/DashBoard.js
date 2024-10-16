import { useEffect, useState } from "react";
import { Box, Button, useTheme, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header/Header";
import TaskModal from "../../components/TaskModal/TaskModal";
import DeleteConfirmationModal from "../../components/DeleteModal/DeleteConfirmation";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import AddEditForm from "../../components/AddEditForm";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const DEFAULT_TASK_LIST = [];
    const [taskList, setTaskList] = useState(() => {
        const savedTasks = localStorage.getItem("taskList");
        return savedTasks ? JSON.parse(savedTasks) : DEFAULT_TASK_LIST;
    });

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [activeCardId, setActiveCardId] = useState(null);
    const [currentTask, setCurrentTask] = useState({});
    const [isEditMode, setEditMode] = useState(false);

    // Dynamic Status Columns
    const DEFAULT_STATUSES = ["todo", "inProgress", "done"];
    const [taskStatuses, setTaskStatuses] = useState(() => {
        const savedStatuses = localStorage.getItem("taskStatuses");
        return savedStatuses ? JSON.parse(savedStatuses) : DEFAULT_STATUSES;
    });
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList));
        localStorage.setItem("taskStatuses", JSON.stringify(taskStatuses));
    }, [taskList, taskStatuses]);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const onEdit = (editTaskId) => {
        setOpenModal(true);
        setEditMode(true);
        const _editTask = taskList.find((task) => task.id === editTaskId) || {};
        setCurrentTask(_editTask);
    };

    const onClickDelete = (deleteTaskId) => {
        setOpenDeleteModal(true);
        const _taskTobeDeleted = taskList.find((task) => task.id === deleteTaskId);
        setCurrentTask(_taskTobeDeleted);
    };

    const onDeleteConfirm = () => {
        const _newTaskList = taskList.filter((task) => task.id !== currentTask.id);
        setTaskList(_newTaskList);
        setCurrentTask({});
        setOpenDeleteModal(false);
    };

    const handleDeleteClose = () => setOpenDeleteModal(false);

    const onDropTask = (status, position) => {
        if (!activeCardId) return;

        const taskToMoveIndex = taskList.findIndex((task) => task.id === activeCardId);
        if (taskToMoveIndex === -1) return;

        const updatedTaskList = [...taskList];
        const [taskToMove] = updatedTaskList.splice(taskToMoveIndex, 1);
        taskToMove.status = status;

        updatedTaskList.splice(position, 0, taskToMove);
        setTaskList(updatedTaskList);
        setActiveCardId(null);
    };

    const onFavoriteToggle = (task) => {
        const updatedTaskList = taskList.map(t =>
            t.id === task.id ? { ...t, favorite: !t.favorite } : t
        );
        setTaskList(updatedTaskList);
    }

    // Handle Adding New Task Status
    const handleAddNewStatus = () => {
        if (newStatus && !taskStatuses.includes(newStatus)) {
            setTaskStatuses([...taskStatuses, newStatus]);
            setNewStatus("");
        }
    };

    const handleNewStatusChange = (event) => {
        setNewStatus(event.target.value);
    };

    const getGridSize = () => {
        const totalStatuses = taskStatuses.length;
        return totalStatuses > 0 ? 12 / totalStatuses : 12;
    };

    return (
        <>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="DASHBOARD" subtitle="Welcome to your Task Tracker" />

                    <Box display="flex" alignItems="center" mt={2}>
                        <TextField
                            label="New Task Status"
                            value={newStatus}
                            onChange={handleNewStatusChange}
                            variant="outlined"
                            size="small"
                            sx={{ marginRight: 2 }}
                        />
                        <Button
                            onClick={handleAddNewStatus}
                            variant="contained"
                            color="primary"
                            sx={{
                                padding: "8px 16px",
                                textTransform: 'none',
                                borderRadius: '5px',
                                marginRight: 2,
                            }}
                        >
                            Add Status
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: colors.greenAccent[500],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "8px 16px",
                                boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                                borderRadius: '5px',
                                textTransform: 'none',
                            }}
                            onClick={handleOpen}
                        >
                            Add Task
                        </Button>
                    </Box>
                </Box>
                <Grid container spacing={2}>
                    {taskStatuses.map((status) => (
                        <Grid key={status} item size={getGridSize()}>
                            <TaskColumn
                                title={status.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                tasks={taskList.filter((task) => task.status === status)}
                                onEdit={onEdit}
                                onClickDelete={onClickDelete}
                                onFavoriteToggle={onFavoriteToggle}
                                setOpenModal={setOpenModal}
                                activeCardId={activeCardId}
                                status={status}
                                onDropTask={onDropTask}
                                setActiveCardId={setActiveCardId}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <TaskModal open={openModal} handleClose={handleClose}>
                <AddEditForm
                    taskDetails={currentTask}
                    setCurrentTask={setCurrentTask}
                    isEditMode={isEditMode}
                    setEditMode={setEditMode}
                    setOpenModal={setOpenModal}
                    setTaskList={setTaskList}
                />
            </TaskModal>

            <DeleteConfirmationModal
                open={openDeleteModal}
                onDeleteConfirm={onDeleteConfirm}
                handleDeleteClose={handleDeleteClose}
            />
        </>
    );
};

export default Dashboard;
