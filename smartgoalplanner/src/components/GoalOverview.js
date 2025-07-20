import React from 'react';

function GoalOverview({ goals }) {
    // calculate total goals, total saved amount, and completed goals
  const totalGoals = goals.length
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0)
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length
  
    return (
    <div className="overview-card">
      <h2>📊 Overview</h2>
      <div className="overview-stats">
        <p>Total Goals: {totalGoals}</p>
        <p>Total Saved: KE {totalSaved}</p>
        <p>Completed: {completedGoals}</p>
      </div>
    </div>
  );
}

export default GoalOverview;