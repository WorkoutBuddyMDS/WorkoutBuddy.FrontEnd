import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import AuthHeader from "@/utils/authrorizationHeader";
import { Box, Button, FormControl, FormLabel, Input, Stack, Typography } from "@mui/material";

const Workout = (props) => {
  const [exercises, setExercises] = useState([]);

  const muscleGroupsChangeHandler = async (e) => {
    let queryString = "?";
    let indexOfMuscles = 0;

    for (let elem of e) {
      queryString = `${queryString}[${indexOfMuscles}]=${elem.value}&`;
      indexOfMuscles++;
    }
    const { data } = await axios({
      method: "get",
      url: `https://localhost:7132/Exercises/getExercisesByMuscleGroups${queryString}`,
      headers: {
        Authorization: AuthHeader(),
      },
    });
    setExercises(data);

    const workouts = props.split.workouts;
    workouts[props.index] = {
      ...props.split.workouts[props.index],
      selectedMuscleGroups: e,
    };
    props.setSplit({ ...props.split, workouts });
  };

  const changeNameHandler = (e) => {
    const workouts = props.split.workouts;
    workouts[props.index] = {
      ...props.split.workouts[props.index],
      [e.target.id]: e.target.value,
    };
    props.setSplit({ ...props.split, workouts });
  };

  const changeExercisesHandler = (e) => {
    const workouts = props.split.workouts;
    workouts[props.index] = {
      ...props.split.workouts[props.index],
      exercises: e,
    };
    props.setSplit({ ...props.split, workouts });
  };

  const deleteWorkout = (e) => {
    const workouts = props.split.workouts;
    workouts[props.index] = {
      ...props.split.workouts[props.index],
      isDeleted: true,
    };
    props.setSplit({ ...props.split, workouts });
  };

  return (
    <Stack
      spacing={4}
      p={6}
      my={12}
      border="dashed"
    >
      <Box display="flex" justifyContent="space-between">
        <Typography lineHeight={1.1} fontSize={{ base: "lg", sm: "md" }}>
          New workout
        </Typography>
        <Button onClick={deleteWorkout}>
          delete
        </Button>
      </Box>

      <FormControl>
        <FormLabel> Workout Name</FormLabel>
        <Input
          value={props.split.workouts[props.index].workoutName}
          id="workoutName"
          onChange={changeNameHandler}
          placeholder="name"
          type="text"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Muscle groups</FormLabel>
        <Select
          value={props.split.workouts[props.index].selectedMuscleGroups}
          id="selectedMuscleGroups"
          onChange={muscleGroupsChangeHandler}
          isMulti
          options={props.split.musclesGroups}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Exercises</FormLabel>
        <Select
          value={props.split.workouts[props.index].exercises}
          id="exercises"
          onChange={changeExercisesHandler}
          isMulti
          options={exercises}
        />
      </FormControl>
    </Stack>
  );
};

export default Workout;