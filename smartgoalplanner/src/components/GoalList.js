import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals }) {
  return (
    <div className="goal-grid">
      <h2>🏆 Your Goals</h2>
      <GoalItem 
        goals={goals}
      />
      {/* GoalItem components will go here */}
    </div>
  );
}

export default GoalList;

// {
//           name: "Save for Vacation",
//           targetAmount: 2000,
//           savedAmount: 500,
//           category: "Travel",
//           deadline: "2024-12-31"}