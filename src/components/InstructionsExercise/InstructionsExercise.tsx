import React from 'react';
import { List, ListItem, Typography } from '@mui/material';

const InstructionsExercise = (props: { exerciseType?: string }) => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Tips for {props.exerciseType} exercises:
      </Typography>
      <List>
        {props.exerciseType === 'Cardio' ? (
          <>
            <ListItem>
              <Typography variant="body1">
                Do a 5- to 10-minute warm-up at low intensity (50% to 60% of
                your maximum heart rate) to prepare your muscles for exercise
                and steadily raise your heart rate.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Do whatever activity will be your workout for your warm-up. If
                you are walking or running, start at an easy pace that puts you
                into this low-intensity heart rate zone—where you can still
                carry on a full conversation.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Next, stretch the muscles you will use in your workout. They are
                warmed up and may benefit from flexibility stretches or drills
                specific to the muscle groups you will be using in the workout.
              </Typography>
            </ListItem>
          </>
        ) : props.exerciseType === 'WeightLifting' ? (
          <>
            <ListItem>
              <Typography variant="body1">
                Lift an appropriate amount of weight. Start with a weight you
                can lift comfortably 12 to 15 times.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Use proper form. Learn to do each exercise correctly. When
                lifting weights, move through the full range of motion in your
                joints. The better your form, the better your results, and the
                less likely you are to hurt yourself
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Breathe. You might be tempted to hold your breath while
                you&#39re lifting weights. Don&#39t hold your breath. Instead,
                breathe out as you lift the weight and breathe in as you lower
                the weight.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Seek balance. Work all of your major muscles — including the
                abdomen, hips, legs, chest, back, shoulders and arms.
              </Typography>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <Typography variant="body1">
                Add repetitions, sets, increase time between sets.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">Increase range of motion.</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Change position of body in space.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Combine difficult and easy exercises.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Combining exercises into more complex moves.
              </Typography>
            </ListItem>
          </>
        )}
      </List>
    </>
  );
};

export default InstructionsExercise;
