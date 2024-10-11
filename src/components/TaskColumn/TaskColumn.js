import { Box, Container, Typography } from "@mui/material";
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
  setActiveCardId,
}) {
  return (
    <Box margin={2}>
      <Container>
        <Typography variant="h4" style={{textAlign: 'center'}}>{title}</Typography>
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
            setActiveCardId={setActiveCardId}
          />
          <DropArea onDropTask={() => onDropTask(status, index + 1)} />
        </div>
      ))}
    </Box>
  );
}

export default TaskColumn;
