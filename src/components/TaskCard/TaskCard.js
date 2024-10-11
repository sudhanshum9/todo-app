// import { Card, CardContent, Typography, IconButton} from '@mui/material';
// import { Delete, Edit, Star, StarBorder } from '@mui/icons-material';

// function TaskCard({ task, onEdit, onClickDelete, index,setActiveCardId ,onFavoriteToggle}) {

//   const handleEditOpen = (editTaskId) => {
//     onEdit(editTaskId);
//   };

//   return (
//     <div draggable onDragStart={() => setActiveCardId(task.id)}>
//       <Card sx={{ marginBottom: 2 }} draggable>
//         <CardContent>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{task.name}</Typography>
//             <IconButton onClick={() => onFavoriteToggle(task)}>
//               {task.favorite ? <Star color="primary" /> : <StarBorder />}
//             </IconButton>
//           </div>
//           <Typography variant="body2" color="textSecondary">{task.description}</Typography>
//           <Typography variant="h6" color="textSecondary">{task.status}</Typography>
//           {/* <Typography variant="body2" color="textSecondary">Deadline: {task.deadline}</Typography> */}

//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
//             <IconButton onClick={()=> handleEditOpen(task.id)}>
//               <Edit />
//             </IconButton>
//             <IconButton onClick={() => onClickDelete(task.id)}>
//               <Delete />
//             </IconButton>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default TaskCard;
