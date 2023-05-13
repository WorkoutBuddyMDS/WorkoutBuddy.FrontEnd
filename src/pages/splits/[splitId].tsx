import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ISplit } from '.';
import AuthHeader from '@/utils/authrorizationHeader';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import {
  Box,
  Button,
  Grid,
  Icon,
  List,
  ListItem,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import Comments from '@/components/Comments/Comments';

export interface IComment {
  commentId: string;
  commentText: string;
  commentReplys: IComment[];
  parrentCommentId: string;
  author: string;
  authorRole: string;
  parentSplitId: string;
}
interface IWorkout {
  workoutName: string;
  exercisesList: string[];
}

interface IViewSplit {
  splitId: string;
  name: string;
  description: string;
  creatorName: string;
  CreatorId: string;
  Rating: number;
  workouts: IWorkout[];
  comments: IComment[];
}

interface IViewSplit {
  splitId: string;
}
function ViewSplit({ splitId }: IViewSplit) {
  const [split, setSplit] = useState({
    workouts: [] as IWorkout[],
    comments: [] as IComment[],
  } as IViewSplit);
  const [commentText, setCommentText] = useState('');
  const [isNewComment, setIsNewComment] = useState(false);

  useEffect(() => {
    const id = location.href.split('/').pop();

    const getSplit = async (id: string | undefined) => {
      const { data } = await axios.get(
        `https://localhost:7132/Split/viewSplit?id=${id}`,
        {
          headers: {
            Authorization: AuthHeader(),
          },
        }
      );
      setSplit(data);
    };

    getSplit(id);
  }, [isNewComment]);

  const addHandler = async (text: string, parentCommentId: string | null = null) => {
    let newComment = {
      commentText: text,
      parentCommentId,
      parentSplitId: split.splitId,
    };

    await axios.post(`https://localhost:7132/Comment/add`, newComment, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthHeader(),
      }},
    );
    setIsNewComment((state) => !state);
    setCommentText('');
  };
  return (
    <Box>
      <Stack border="dashed" spacing={{ base: 6, md: 10 }}  width="50%" margin="auto" my="2rem">
        <Box sx={{bgcolor: "#d4f0a5", width: "100%", py: "2rem"}}>
          <Typography variant="h2" textAlign="center">
            {split.name}
          </Typography>
          <Typography variant="h5" color={'gray.500'} textAlign="center">
            Creator: @{split.creatorName}
          </Typography>
        </Box>

        <Stack spacing={{ base: 4, sm: 6 }} direction={'column'}>
          <Stack flexDirection="column" spacing={{ base: 4, sm: 6 }}>
            <Typography fontSize={'2xl'} fontWeight={'300'}>
              Description: {split.description}
            </Typography>
          </Stack>
          {split.workouts.map((workout, index) => {
            return (
              <div key={index}>
                <Box>
                  <Typography
                    fontSize={{ base: '16px', lg: '18px' }}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    {workout.workoutName}
                  </Typography>

                  <Box>
                    {workout.exercisesList.map((ex) => {
                      return (
                        <Typography>
                            {/* <Icon as={ArrowRightIcon} color="green.500" /> */}
                            {ex}
                        </Typography>
                      );
                    })}
                  </Box>
                </Box>
              </div>
            );
          })}
        </Stack>
        <Stack>
      <Typography variant="h5">Comments:</Typography>
      <Stack
        p={6}
        m="auto"
      >
        <Typography variant="h6">Do you have any question?</Typography>
        <Stack direction="row">
          <TextareaAutosize 
            placeholder="say something nice"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Box alignItems="center" justifyContent="center">
            <Button
              onClick={() => addHandler(commentText)}
            >
              Add comment
            </Button>
          </Box>
        </Stack>
      </Stack>

      <Comments comments={split.comments} addHandler={addHandler}/>
    </Stack>
      </Stack>
    </Box>
  );
}

ViewSplit.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default ViewSplit;

// export async function getStaticPaths() {
//   const { data } = await axios.get(`https://localhost:7132/Split/getSplits`);
//   console.log(data);

//   const paths = data.map((split: ISplit) => ({
//     params: { id: split.splitId },
//   }));
//   return {
//     paths,
//     fallback: false, // can also be true or 'blocking'
//   };
// }

// export async function getStaticProps(context) {
//   return {
//     props: {
//       splitId: context.params.id,
//     },
//   };
// }
