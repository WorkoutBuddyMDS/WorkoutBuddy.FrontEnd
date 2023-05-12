import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ISplit } from '.';
import AuthHeader from '@/utils/authrorizationHeader';

interface IComment{
    commentId: string,
    commentText: string,
    commentReplies: IComment[],
    parrentCommentId: string,
    author: string,
    authorRole: string,
    parentSplitId: string
}
interface IWorkout{ workoutName: string; exercisesList: string[] }

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
export default function ViewSplit({ splitId }: IViewSplit){
  const [split, setSplit] = useState({ workouts: [] as IWorkout[], comments: [] as IComment[] } as IViewSplit);
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

  const addHandler = async (text: string, parentCommentId = null) => {
    let newComment = {
      commentText: text,
      parentCommentId,
      parentSplitId: split.splitId,
    };

    await axios.post(`https://localhost:7132/Comment/add`,{
      data: newComment,
      headers: {
        Authorization: AuthHeader(),
      },
    });
    setIsNewComment((state) => !state);
    setCommentText('');
  };
  return <div>splitId</div>;
};

export async function getStaticPaths() {
  const { data } = await axios.get(`https://localhost:7132/Split/getSplits`);
  console.log(data);

  const paths = data.map((split: ISplit) => ({
    params: { id: split.splitId },
  }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      splitId: context.params.id,
    },
  };
}
