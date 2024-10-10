import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DropArea from "../DropArea/DropArea";
import TaskCard from "../Card/Card";

function TaskColumn({
  title,
  onEdit,
  tasks,
  status,
  onDropTask,
  onClickDelete,
  onFavoriteToggle,
  activeCardId,
  setactiveCardId,
}) {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Container>
        <Typography variant="h4">{title}</Typography>
      </Container>

      <DropArea onDropTask={() => onDropTask(status, 0)} />

      {tasks.map((task, index) => (
        <div key={task.id}>
          <TaskCard
            task={task}
            index={index}
            onEdit={onEdit}
            onClickDelete={onClickDelete}
            onFavoriteToggle={onFavoriteToggle}
            activeCardId={activeCardId}
            setactiveCardId={setactiveCardId}
          />
          <DropArea onDropTask={() => onDropTask(status, index + 1)} />
        </div>
      ))}
    </Grid>
  );
}

export default TaskColumn;
