import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/material';

export default function TaskCard({ task, onEdit, onClickDelete, onFavoriteToggle, activeCardId, setActiveCardId }) {
  // Determine if the card is active
  const isActive = activeCardId === task.id;

  const handleEditOpen = () => {
    onEdit(task.id);
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle(task.id);
  };

  const handleDragStart = (e) => {
    setActiveCardId(task.id);
    e.dataTransfer.effectAllowed = 'move'; // Ensure this is set for the drag operation
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragEnd = () => {
    setActiveCardId(null);
    console.log({ activeCardId });
  };

  return (
    <Box
      role="article"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sx={{
        borderRadius: 2,
        boxShadow: isActive ? '0px 4px 20px rgba(0, 0, 0, 0.1)' : '0px 2px 10px rgba(0, 0, 0, 0.05)',
        border: isActive ? '2px solid #1976d2' : '1px solid #e0e0e0',
        cursor: isActive ? 'grabbing' : 'grab',
        transition: 'all 0.3s ease',
        backgroundColor: isActive ? '#f3f4f6' : 'white',
        overflow:'hidden',
        margin: 2,
        '&:hover': {
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleEditOpen} aria-label="Edit Task">
              <Edit />
            </IconButton>
          }
          title={<Typography variant="h6" component="div">{task.name}</Typography>}
          subheader={<Typography variant="caption" color="text.secondary">{`Deadline: ${task.deadline}`}</Typography>}
          sx={{
            backgroundColor: '#f5f5f5',
            padding: '8px 16px',
          }}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {task.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
          <IconButton onClick={handleFavoriteToggle} aria-label="Add to favorites">
            <FavoriteIcon sx={{ color: task.isFavorite ? '#ff1744' : '#e0e0e0' }} />
          </IconButton>
          <IconButton onClick={() => onClickDelete(task.id)} aria-label="Delete Task">
            <Delete sx={{ color: '#d32f2f' }} />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
