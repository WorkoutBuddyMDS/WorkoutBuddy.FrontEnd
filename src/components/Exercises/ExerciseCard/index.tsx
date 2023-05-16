import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

export const ExerciseCard = ({
  exercise,
  text,
}: {
  exercise: any;
  text: any;
}) => {
  const [approved, setApproved] = useState(false);
  const [deleted, setDeleted] = useState(false);

  function approveHandler() {
    setApproved(true);
  }

  function deleteHandler() {
    setDeleted(true);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={exercise.imageSrc}
        alt={exercise.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {text.nameExercise}: {exercise.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text.exerciseType}: {exercise.exerciseType}
        </Typography>
        <div className="btnGroup">
          <Button
            variant="contained"
            color="secondary"
            disabled={approved || deleted}
            onClick={approveHandler}
          >
            {text.accept}
          </Button>
          <Button
            variant="contained"
            color="warning"
            disabled={approved || deleted}
            onClick={deleteHandler}
          >
            {text.delete}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
