import NavigationLayout from '@/components/Layouts/NavigationLayout';
import AuthHeader from '@/utils/authrorizationHeader';
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
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useText from '@/services/site-properties/parsing';

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
  const [training, setTraining] = useState<number | undefined>();
  const [calories, setCalories] = useState('');
  const lang = useSelector((state: RootState) => state.language.language);

  useEffect(() => {
    const getWeight = async () => {
      const { data } = await axios({
        method: 'get',
        url: 'https://localhost:7132/UserAccount/getCurrentWeight',
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setWeight(parseInt(data));
    };

    getWeight();
  }, []);

  const calculateResult = () => {
    let calories = weight * 24;
    calories = gender == '0' ? calories : calories * 0.9;
    calories =
      parseInt(age || '0') > 30
        ? (calories *
            (100 - Math.round((parseInt(age || '0') - 30) / 10) * 10)) /
          100
        : calories;
    calories =
      somaticType == '0'
        ? calories * 0.95
        : somaticType == '2'
        ? calories * 1.05
        : calories;
    calories =
      objective.type == '0'
        ? (calories * (90 - objective.rate)) / 100
        : objective.type == '2'
        ? (calories * (110 + objective.rate)) / 100
        : calories;
    calories = (calories * (110 + 2 * (activity || 0))) / 100;
    calories = isTraining
      ? calories + ((training || 0) + 3) * weight
      : calories;
    setCalories(calories.toString());
  };

  const text = {
    header: useText('pages.calorie-calculator.title.header', lang),
    text: useText('pages.calorie-calculator.title.text', lang),
    recommendation: useText(
      'pages.calorie-calculator.recommendation.text',
      lang
    ),
    gender: useText('pages.calorie.calculator.gender.text', lang),
    male: useText('pages.calorie.calculator.gender.male', lang),
    female: useText('pages.calorie.calculator.gender.female', lang),
    age: useText('pages.calorie.calculator.age.text', lang),
    somaticType: useText('pages.calorie.calculator.somatic.text', lang),
    somatic1: useText('pages.calorie.calculator.somatic.type1', lang),
    somatic2: useText('pages.calorie.calculator.somatic.type2', lang),
    somatic3: useText('pages.calorie.calculator.somatic.type3', lang),
    objective: useText('pages.calorie.calculator.objective.text', lang),
    loss: useText('pages.calorie.calculator.objective.option1', lang),
    maintain: useText('pages.calorie.calculator.objective.option2', lang),
    gain: useText('pages.calorie.calculator.objective.option3', lang),
    q1: useText('pages.calorie.calculator.objective.q1', lang),
    q2: useText('pages.calorie.calculator.objective.q2', lang),
    q3: useText('pages.calorie.calculator.objective.q3', lang),
    q4: useText('pages.calorie.calculator.objective.q4', lang),
    calculate: useText('pages.calorie.calculator.calculate.text', lang),
  };
  return (
    <Container sx={{ display: 'flex', p: 7, flexDirection: 'column' }}>
      <Stack alignItems="center">
        <Typography variant="h2">{text.header}</Typography>
        <Typography variant="subtitle1" textAlign="center" width="50%">
          {text.text}
        </Typography>
        <Typography
          variant="overline"
          fontSize={18}
          textAlign="center"
          width="50%"
        >
          {text.recommendation} {calories}
        </Typography>
      </Stack>
      <Stack pt={6} flexDirection="column" spacing={3}>
        <FormControl>
          <FormLabel>{text.gender}</FormLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="0">{text.male}</MenuItem>
            <MenuItem value="1">{text.female}</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>{text.age}</FormLabel>
          <TextField
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></TextField>
        </FormControl>
        <FormControl>
          <FormLabel>{text.somaticType}</FormLabel>
          <Select
            value={somaticType}
            onChange={(e) => setSomaticType(e.target.value)}
          >
            <MenuItem value="0">{text.somatic1}</MenuItem>
            <MenuItem value="1">{text.somatic2}</MenuItem>
            <MenuItem value="2">{text.somatic3}</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>{text.objective}</FormLabel>
          <Select
            value={objective.type}
            onChange={(e) =>
              setObjective({ ...objective, type: e.target.value })
            }
          >
            <MenuItem value="0">{text.loss}</MenuItem>
            <MenuItem value="1">{text.maintain}</MenuItem>
            <MenuItem value="2">{text.gain}</MenuItem>
          </Select>
        </FormControl>
        {objective.type != '1' && (
          <FormControl>
            <FormLabel>{text.q1}</FormLabel>
            <Slider
              defaultValue={0}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
              value={objective.rate}
              onChange={(e: any) =>
                setObjective({ ...objective, rate: e.target?.value })
              }
            />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>{text.q2}</FormLabel>
          <Slider
            defaultValue={0}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            value={activity}
            onChange={(e: any) => setActivity(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            sx={{ flexDirection: 'row' }}
            control={
              <Checkbox
                checked={isTraining}
                value={isTraining}
                onChange={() => {
                  setIsTraining(!isTraining);
                }}
              />
            }
            label={text.q3}
            labelPlacement="start"
          />
        </FormControl>
        {isTraining && (
          <FormControl>
            <FormLabel>{text.q4}</FormLabel>
            <Slider
              defaultValue={0}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={5}
              value={training}
              onChange={(e: any) => setTraining(e.target.value)}
            />
          </FormControl>
        )}
      </Stack>
      <Button variant="outlined" onClick={() => calculateResult()}>
        {text.calculate}
      </Button>
    </Container>
  );
};

CaloriesCalculator.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default CaloriesCalculator;
