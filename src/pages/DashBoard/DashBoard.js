import { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
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

    const [taskList, setTaskList] = useState(() => {
        const savedTasks = localStorage.getItem("taskList");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [activeCardId, setActiveCardId] = useState(null);
    const [currentTask, setCurrentTask] = useState({});
    const [isEditMode, setEditMode] = useState(false);

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }, [taskList]);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    
    const onEdit = (editTaskId) => {
        setOpenModal(true);
        setEditMode(true);
        const _editTask = taskList.find((task) => task.id === editTaskId);
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
        const taskToMove = taskList.find((task) => task.id === activeCardId);
        const updatedTaskList = taskList.filter((task) => task.id !== activeCardId);
        taskToMove['status'] = status;
        updatedTaskList.splice(position, 0, taskToMove);
        setTaskList(updatedTaskList);
    };

    const onFavoriteToggle = () => { };

    // Filter tasks by status
    const todoTasks = taskList.filter((task) => task.status === "todo");
    const inProgressTasks = taskList.filter((task) => task.status === "inProgress");
    const doneTasks = taskList.filter((task) => task.status === "done");

    return (
        <>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="DASHBOARD" subtitle="Welcome to your Task Tracker" />
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                            borderRadius: '5px',
                            textTransform: 'uppercase'
                        }}
                        onClick={handleOpen}
                    >
                        Add Task
                    </Button>
                </Box>

                <Grid container spacing={3} style={{ marginTop: '30px', width: '100%', minHeight: '80vh' }}>
                    {/* To Do Column */}
                    <Grid item={true} xs={12} sm={4}>
                        <TaskColumn
                            title='To Do'
                            tasks={todoTasks}
                            onEdit={onEdit}
                            onClickDelete={onClickDelete}
                            onFavoriteToggle={onFavoriteToggle}
                            setOpenModal={setOpenModal}
                            activeCardId={activeCardId}
                            status='todo'
                            onDropTask={onDropTask}
                            setactiveCardId={setActiveCardId}
                        />
                    </Grid>

                    {/* In Progress Column */}
                    <Grid item={true} xs={12} sm={4}>
                        <TaskColumn
                            title='In Progress'
                            tasks={inProgressTasks}
                            onEdit={onEdit}
                            onClickDelete={onClickDelete}
                            onFavoriteToggle={onFavoriteToggle}
                            setOpenModal={setOpenModal}
                            activeCardId={activeCardId}
                            status='inProgress'
                            onDropTask={onDropTask}
                            setactiveCardId={setActiveCardId}
                        />
                    </Grid>

                    {/* Done Column */}
                    <Grid item={true} xs={12} sm={4}>
                        <TaskColumn
                            title='Done'
                            tasks={doneTasks}
                            onEdit={onEdit}
                            onClickDelete={onClickDelete}
                            onFavoriteToggle={onFavoriteToggle}
                            setOpenModal={setOpenModal}
                            activeCardId={activeCardId}
                            status='done'
                            onDropTask={onDropTask}
                            setactiveCardId={setActiveCardId}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Modals */}
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
