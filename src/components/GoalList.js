import React from 'react';
import GoalItem from './GoalItem';

// Component to display a list of goals
// Accepts goals, onGoalUpdated, and onGoalDeleted as props
function GoalList({ goals, onGoalUpdated, onGoalDeleted }) {
    return (
     <div className='goal-grid'>
        <h2>🏆 Your Goals</h2>
        <div className="goal-grid-items">
            {/* / Maps over goals and renders GoalItem for each goal*/}
            {goals.map(goal => (
                // Render each goal item
                <GoalItem 
                    key={goal.id}  // Uses key prop for React's reconciliation process
                    goal={goal} 
                    onGoalUpdated={onGoalUpdated}
                    onGoalDeleted={onGoalDeleted}
                />
            ))}
        </div>
        </div>
    );
}

export default GoalList;