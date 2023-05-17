import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import Workout from '@/components/Workouts/Workout';
import NavigationLayout from '@/components/Layouts/NavigationLayout';

interface ISelectItem {
  value: string;
  label: string;
}

interface IInsertSplitModel {
  splitId: string;
  name: string;
  description: string;
  musclesGroups: ISelectItem[];
  creatorId: string;
  workouts: IWorkoutModel[];
  isPrivate: boolean;
}

interface IWorkoutModel {
  id: string;
  workoutName: string;
  exercises: ISelectItem[];
  selectedMuscleGroups: string[];
  isDeleted: boolean;
}

const splitInitialState: IInsertSplitModel = {
  splitId: '',
  name: '',
  description: '',
  musclesGroups: [],
  creatorId: '',
  workouts: [],
  isPrivate: false,
};

const workoutInitialState: IWorkoutModel = {
  id: '',
  workoutName: '',
  exercises: [],
  selectedMuscleGroups: [],
  isDeleted: false,
};

function InsertSplit() {
  const router = useRouter();
  const [split, setSplit] = useState(splitInitialState);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params?.get('id');

    const getSplit = async () => {
      const { data } = await axios({
        method: 'get',
        url: `https://localhost:7132/Split/getInsertModel?id=${
          id ?? '00000000-0000-0000-0000-000000000000'
        }`,
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setSplit(data);
      console.log(data);
    };

    getSplit();
  }, []);

  const newWorkoutHandler = () => {
    const newWorkouts = split.workouts;
    newWorkouts.push(workoutInitialState);
    setSplit({ ...split, workouts: newWorkouts });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    let formData = new FormData();

    let querryString = `?`;

    formData.append('splitId', split.splitId);
    formData.append('name', split.name);
    formData.append('description', split.description);
    formData.append('isPrivate', split.isPrivate ?? false);
    debugger;
    let index = 0;
    for (let w of split.workouts) {
      querryString += `&[${index}].id=${w.id}`;
      querryString += `&[${index}].workoutName=${w.workoutName}`;
      querryString += `&[${index}].isDeleted=${w.isDeleted}`;
      let i = 0;
      for (let ex of w.exercises) {
        querryString += `&[${index}].exercises[${i}]=${ex.value}`;
        i++;
      }

      index++;
    }

    try {
      await axios({
        method: 'post',
        url: `https://localhost:7132/Split/insertSplit${querryString}`,
        data: formData,
        headers: {
          Authorization: AuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/splits');
    } catch (err) {
      console.log('treat errs');
    }
  };

  return (
    <Box
      sx={{
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: "center"
      }}
    >
      <Stack spacing={4} p={6} width= "50%" border="dashed">
        <Typography
          variant="h2"
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl' }}
        >
          Insert Split
        </Typography>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            value={split.name}
            onChange={(e) => setSplit({ ...split, name: e.target.value })}
            placeholder="name"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <TextareaAutosize
            value={split.description}
            onChange={(e) =>
              setSplit({ ...split, description: e.target.value })
            }
            placeholder="description"
          />
        </FormControl>
        {split.workouts &&
          split.workouts.map((w, index) => {
            if (!w.isDeleted) {
              return (
                <Workout
                  key={index}
                  index={index}
                  musclesGroups={split.musclesGroups}
                  split={split}
                  setSplit={setSplit}
                />
              );
            }
          })}

        <FormControl>
          <Box justifyContent="center">
            <Button onClick={newWorkoutHandler}>Add new workout</Button>
          </Box>
        </FormControl>
        <FormControl>
        <FormControlLabel control={<Checkbox  checked={split.isPrivate}
            value={split.isPrivate}
            onChange={(e) => {
              setSplit({
                ...split,
                isPrivate: e.target.value == 'false' ? true : false,
              });
            }}/>} label="Is private?" labelPlacement="start" />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button onClick={submitHandler}>Submit</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

InsertSplit.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default InsertSplit;
