import { ExerciseCard } from '@/components/Exercises/ExerciseCard';
import React, { useState } from 'react';
import AdminNavigationLayout from '@/components/Layouts/AdminNavigationLayout';

function PendingExercises({ exercises = [] }: { exercises: { id: number }[] }) {
  const [handlerResult, setHandlerResult] = useState(null);

  function actionHandler(result) {
    setHandlerResult(result);
  }

  return (
    <div className="body">
      {exercises.length > 0 ? (
        <ul className="pendingCards">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} handler={actionHandler} />
          ))}
        </ul>
      ) : (
        <p>Nu exista exercitii de aprobat</p>
      )}
    </div>
  );
}

PendingExercises.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminNavigationLayout>{page}</AdminNavigationLayout>;
};

export default PendingExercises;
