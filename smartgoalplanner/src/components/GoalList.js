import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals, onGoalUpdated, onGoalDeleted }) {
    return (
        <div className="goal-grid">
            <h2>🏆 Your Goals</h2>
            {goals.map(goal => (
                <GoalItem 
                    key={goal.id} 
                    goal={goal} 
                    onGoalUpdated={onGoalUpdated}
                    onGoalDeleted={onGoalDeleted}
                />
            ))}
        </div>
    );
}

export default GoalList;