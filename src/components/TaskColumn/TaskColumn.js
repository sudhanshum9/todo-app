import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TaskCard from "../TaskCard/TaskCard";
import DropArea from "../DropArea/DropArea";

function TaskColumn({ title, onEdit, tasks, status, onDropTask, onClickDelete, onFavoriteToggle, setOpenModal, activeCardId, setactiveCardId }) {
    return (
        <Grid
            justifyContent="center"
            alignItems="center"
            size="grow"
        >
            <Container><Typography variant="h4">{title}</Typography></Container>
            <DropArea onDropTask={() => onDropTask(status, 0)} />
            {tasks.map((task, index) => {
                return (
                    <>
                        <TaskCard
                            task={task}
                            index={index}
                            onEdit={onEdit}
                            onClickDelete={onClickDelete}
                            onFavoriteToggle={onFavoriteToggle}
                            setOpenModal={setOpenModal}
                            activeCardId={activeCardId}
                            setactiveCardId={setactiveCardId}
                        />
                        <DropArea onDropTask={() => onDropTask(status, index+1)} />
                    </>
                );
            })}
        </Grid>
    );
}

export default TaskColumn;
