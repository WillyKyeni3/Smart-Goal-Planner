import React from 'react';

function GoalOverview({ goals }) {
    const totalGoals = goals.length;
    const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);  // Sum of all saved amounts
    const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;  // Count goals that are fully funded
  
    return (
        <div className="overview-card">
            <h2>📊 Overview</h2>
            <div className="overview-stats">
                <p>Total Goals: {totalGoals}</p>
                <p>Total Saved: KE {totalSaved.toLocaleString()}</p>
                <p>Completed: {completedGoals}</p>
            </div>
        </div>
    );
}

export default GoalOverview;