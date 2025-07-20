import React, { useEffect, useState } from 'react';
import GoalOverview from './GoalOverview';
import GoalForm from './GoalForm';
import GoalList from './GoalList';

function App() {
    const [goals, setGoals] = useState([]);

    // Fetch goals from the API when the component mounts
    useEffect(() => {
        fetch('http://localhost:4000/goals') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => setGoals(data))
            .catch(error => console.error('Error fetching goals:', error));
    }, []);

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