import React, { useState } from 'react';
import GoalOverview from './GoalOverview';
import GoalForm from './GoalForm';
import GoalList from './GoalList';

function App() {
    const [goals, setGoals] = useState([]);

  return (
    <div className="container">
      <h1>Smart Goal Planner</h1>
      <p>Your journey to achieving SMART goals starts here!</p>
        <GoalOverview goals={goals}/>
        <GoalForm />
        <GoalList goals={goals} />
    </div>
  );
}

export default App;