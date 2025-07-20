import React, { useState } from 'react';
import GoalOverview from './GoalOverview';
import GoalForm from './GoalForm';
import GoalList from './GoalList';
import GoalItem from './GoalItem';

function App() {
    const [goals, setGoals] = useState([]);

  return (
    <div className="container">
      <h1>Smart Goal Planner</h1>
      <p>Your journey to achieving SMART goals starts here!</p>
        <GoalOverview goals={goals}/>
        <GoalForm />
        <GoalList goals={goals} />
        <GoalItem goal={{
        //   name: "Save for Vacation",
        //   targetAmount: 2000,
        //   savedAmount: 500,
        //   category: "Travel",
        //   deadline: "2024-12-31"
        }} />
    </div>
  );
}

export default App;