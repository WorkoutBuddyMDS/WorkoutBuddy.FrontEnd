import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import AuthHeader from '@/utils/authrorizationHeader';
import axios from 'axios';

export const ExerciseCard = ({ exercise, handler }) => {
  const [triggerRemove, setTriggerRemove] = useState(false);
  

  async function approveHandler() {
    setTriggerRemove(!triggerRemove)
    await axios.post(
      `https://localhost:7132/Exercises/approve`,
      exercise.exerciseId,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthHeader(),
        },
      }
    );
  }

  async function deleteHandler() {
    setTriggerRemove(!triggerRemove)
    await axios.post(
      `https://localhost:7132/Exercises/reject`,
      exercise.exerciseId,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthHeader(),
        },
      }
    );
  }

  return (
    <>
    {!triggerRemove && <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src={`https://localhost:7132/Image/getImageById?id=${exercise.idImage}`}
        alt={exercise.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name: {exercise.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Exercise Type: {exercise.exerciseType}
        </Typography>
        <div className="btnGroup">
          <Button
            variant="contained"
            color="secondary"
            onClick={approveHandler}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>}
    </>
  );
};
