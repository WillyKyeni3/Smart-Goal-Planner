import React, { useEffect, useState } from 'react';
import GoalOverview from './GoalOverview';
import GoalForm from './GoalForm';
import GoalList from './GoalList';

// Main App component
function App() {
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch goals from the server
    const fetchGoals = () => {
        setIsLoading(true);
        fetch('https://smart-goal-planner-ywbu.onrender.com/goals')
            .then(response => response.json())
            .then(data => {
                setGoals(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching goals:', error);
                alert('Failed to load goals!');
                setIsLoading(false);
            });
    };

    // Fetch goals when the component mounts
    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div className="container">
            <h1>Smart Goal Planner</h1>
            <p>Your journey to achieving SMART goals starts here!</p>

            <GoalOverview goals={goals}/>

            <GoalForm onGoalAdded={fetchGoals} />
            
            {/* Display loading state or goal list*/}
            {isLoading ? (
                <p>Loading goals...</p>
            ) : (
                <GoalList 
                    goals={goals} 
                    onGoalUpdated={fetchGoals} 
                    onGoalDeleted={fetchGoals} 
                />
            )}
        </div>
    );
}

export default App;