import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthHeader from '@/utils/authrorizationHeader';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import {
  Box,
  Button,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import Comments from '@/components/Comments/Comments';
import { useRouter } from 'next/router';
import useText from '@/services/site-properties/parsing';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

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

function ViewSplit() {
  const router = useRouter();
  const locale = useSelector((state: RootState) => state.language.language);
  const [split, setSplit] = useState({
    workouts: [] as IWorkout[],
    comments: [] as IComment[],
  } as IViewSplit);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const id = router.query.splitId;

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

    if (id && typeof id === 'string') {
      getSplit(id);
    }
  }, [router]);

  const text = {
    creatorText: useText('pages.splits.split-id.creator.text', locale),
    descriptionText: useText('pages.splits.split-id.description.text', locale),
    comments: useText('pages.splits.split-id.comments.text', locale),
    question: useText('pages.splits.split-id.question.text'),
    addComment: useText('pages.splits.split-id.comment.add.text'),
    placeholder: useText('pages.splits.split-id.textarea.placeholder.text'),
  };

  const addHandler = async (
    text: string,
    parentCommentId: string | null = null
  ) => {
    let newComment = {
      commentText: text,
      parentCommentId,
      parentSplitId: split.splitId,
    };

    await axios.post(`https://localhost:7132/Comment/add`, newComment, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthHeader(),
      },
    });
    setCommentText('');
  };
  return (
    <Box>
      <Stack
        border="dashed"
        spacing={{ base: 6, md: 10 }}
        width="50%"
        margin="auto"
        my="2rem"
      >
        <Box sx={{ bgcolor: '#d4f0a5', width: '100%', py: '2rem' }}>
          <Typography variant="h2" textAlign="center">
            {split.name}
          </Typography>
          <Typography variant="h5" color={'gray.500'} textAlign="center">
            {text.creatorText} @{split.creatorName}
          </Typography>
        </Box>

        <Stack spacing={{ base: 4, sm: 6 }} direction={'column'}>
          <Stack flexDirection="column" spacing={{ base: 4, sm: 6 }}>
            <Typography fontSize={'2xl'} fontWeight={'300'}>
              {text.descriptionText} {split.description}
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
                    {workout.exercisesList.map((ex, index) => {
                      return (
                        <Typography key={index}>
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
          <Typography variant="h5">{text.comments}</Typography>
          <Stack p={6} m="auto">
            <Typography variant="h6">{text.question}</Typography>
            <Stack direction="row">
              <TextareaAutosize
                placeholder={text.placeholder}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Box alignItems="center" justifyContent="center">
                <Button onClick={() => addHandler(commentText)}>
                  {text.addComment}
                </Button>
              </Box>
            </Stack>
          </Stack>

          <Comments comments={split.comments} addHandler={addHandler} />
        </Stack>
      </Stack>
    </Box>
  );
}

ViewSplit.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default ViewSplit;
