import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Delete, Edit } from '@mui/icons-material';

export default function TaskCard({ task, onEdit, onClickDelete, onFavoriteToggle, index, activeCardId, setactiveCardId}) {

  const handleEditOpen = (editTaskId) => {
    onEdit(editTaskId);
  };

 // Determine if the card is active
  const isActive = activeCardId === task.id;

  return (
    <div 
      draggable
      onDragStart={() => setactiveCardId(task.id)}
      onDragEnd={() => setactiveCardId(null)}
      style={{
        opacity: isActive ? 0.7 : 1,
        border: isActive ? '1px solid black' : 'none',
        cursor: 'grab',
      }}
    >
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton onClick={()=> handleEditOpen(task.id)}>
            <Edit />
          </IconButton>
        }
        title={task.name}
        subheader={`Deadline- ${task.deadline}`}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {task.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={() => onClickDelete(task.id)}>
              <Delete />
            </IconButton>
      </CardActions>
    </Card>
    </div>
  );
}