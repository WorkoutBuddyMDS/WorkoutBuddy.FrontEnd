import NavigationLayout from '@/components/Layouts/NavigationLayout';
import AuthHeader from '@/utils/authrorizationHeader';
import { ArrowDropDown, Label } from '@mui/icons-material';
import {
    Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface IObjective {
  type: string;
  rate: number;
}

const CaloriesCalculator = () => {
  const [gender, setGender] = useState<string | undefined>();
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<string | undefined>();
  const [somaticType, setSomaticType] = useState<string | undefined>();
  const [objective, setObjective] = useState<IObjective>({
    type: '1',
    rate: 0,
  });
  const [activity, setActivity] = useState<number | undefined>();
  const [isTraining, setIsTraining] = useState<boolean>();
  const [training, setTraining] = useState<number |undefined>()

  useEffect(() => {
    const getWeight = async () => {
      const { data } = await axios({
        method: 'get',
        url: "https://localhost:7132/UserAccount/getCurrentWeight",
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setWeight(parseInt(data));
    };

    getWeight();
  }, []);

  return (
    <Container sx={{ display: 'flex', p: 7, flexDirection: 'column' }}>
      <Stack alignItems="center">
        <Typography variant="h2">Calories calculator</Typography>
        <Typography variant="subtitle1" textAlign="center" width="50%">
          Input your goal and your details and this calculator will tell you how
          many calories you should eat per day to achieve your goal as fast as
          possible
        </Typography>
      </Stack>
      <Stack pt={6} flexDirection="column" spacing={3}>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="0">Man</MenuItem>
            <MenuItem value="1">Woman</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Age</FormLabel>
          <TextField
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></TextField>
        </FormControl>
        <FormControl>
          <FormLabel>Somatic type</FormLabel>
          <Select
            value={somaticType}
            onChange={(e) => setSomaticType(e.target.value)}
          >
            <MenuItem value="0">Ectomorf</MenuItem>
            <MenuItem value="1">Mezomorf</MenuItem>
            <MenuItem value="2">Endomorf</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Objective</FormLabel>
          <Select
            value={objective.type}
            onChange={(e) =>
              setObjective({ ...objective, type: e.target.value })
            }
          >
            <MenuItem value="0">Weight loss</MenuItem>
            <MenuItem value="1">Mentaining</MenuItem>
            <MenuItem value="2">Weight gain</MenuItem>
          </Select>
        </FormControl>
        {objective.type != '1' && (
          <FormControl>
            <FormLabel>
              On a scale of 1 to 10, how fast do you want to achieve this goal?
            </FormLabel>
            <Slider
              defaultValue={0}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
              value={objective.rate}
              onChange={(e) =>
                setObjective({ ...objective, rate: e.target?.value })
              }
            />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>
            On a scale of 1 to 10, how active are you on a day to day basis?
          </FormLabel>
          <Slider
            defaultValue={0}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            sx={{ flexDirection: 'row' }}
            control={
              <Checkbox
                checked={isTraining}
                value={isTraining}
                onChange={(e) => {
                  setIsTraining(!isTraining);
                }}
              />
            }
            label="Are you doing any type of exercises?"
            labelPlacement="start"
          />
        </FormControl>
        {isTraining && (
          <FormControl>
            <FormLabel>
              On a scale of 1 to 5, how intense do you train?
            </FormLabel>
            <Slider
              defaultValue={0}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={5}
              value={training}
              onChange={(e) => setTraining(e.target.value)}
            />
          </FormControl>
        )}
      </Stack>
      <Button variant="outlined">
        Calculate
      </Button>
    </Container>
  );
};

CaloriesCalculator.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default CaloriesCalculator;
