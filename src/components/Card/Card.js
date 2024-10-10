import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Delete, Edit } from '@mui/icons-material';

export default function TaskCard({ task, onEdit, onClickDelete, onFavoriteToggle, activeCardId, setactiveCardId }) {
  
  // Determine if the card is active
  const isActive = activeCardId === task.id;

  const handleEditOpen = () => {
    onEdit(task.id);
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle(task.id);
  };

  const handleDragStart = () => {
    setactiveCardId(task.id);
  };

  const handleDragEnd = () => {
    if (activeCardId !== null) {
      setactiveCardId(null);
    }
  };

  return (
    <div
      role="article"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        opacity: isActive ? 0.7 : 1,
        border: isActive ? '1px solid black' : 'none',
        cursor: isActive ? 'grabbing' : 'grab',
        transition: 'opacity 0.2s ease',
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton onClick={handleEditOpen} aria-label="Edit Task">
              <Edit />
            </IconButton>
          }
          title={task.name}
          subheader={`Deadline: ${task.deadline}`}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {task.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleFavoriteToggle} aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={() => onClickDelete(task.id)} aria-label="Delete Task">
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
