import { ExerciseCard } from '@/components/Exercises/ExerciseCard';
import React, { useEffect, useState } from 'react';
import AdminNavigationLayout from '@/components/Layouts/AdminNavigationLayout';
import axios from 'axios';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/navigation';
import { BasicLoader } from '@/components/Loader/BasicLoader';

function PendingExercises() {
  const [handlerResult, setHandlerResult] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const roles = sessionStorage.getItem('roles');
    if (!roles?.includes('Admin')) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const result = await axios.get(
          'https://localhost:7132/Admin/getPendingExercises',
          {
            headers: {
              Authorization: AuthHeader(),
            },
          }
        );
        console.log(result);
        const data = result.data;
        setExercises(data);
      } catch (error) {
        console.log(error);
        return {
          props: {
            error: error.message,
          },
        };
      }
    };
    getExercises();
  }, []);

  function actionHandler(result: any) {
    setHandlerResult(result);
  }

  return (
    <>
      {!error ? (
        <div className="body">
          {exercises.length > 0 ? (
            <ul className="pendingCards">
              {exercises.map((ex) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  handler={actionHandler}
                />
              ))}
            </ul>
          ) : (
            <p>Nu exista exercitii de aprobat</p>
          )}
        </div>
      ) : (
        <h1>500 - Server-side error occurred</h1>
      )}
    </>
  );
}

PendingExercises.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminNavigationLayout>{page}</AdminNavigationLayout>;
};

export default PendingExercises;
