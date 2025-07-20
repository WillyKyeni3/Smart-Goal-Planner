import React from 'react';

function GoalItem({ goal }) {
  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      <p>🎯 Target: KE {goal.targetAmount}</p>
      <p>💰 Saved: KE {goal.savedAmount}</p>
      <p>📦 Category: {goal.category}</p>
      <p>📅 Deadline: {goal.deadline}</p>
      
      <div className="progress-bar">
        <div style={{ width: "0%" }}></div>
      </div>
      
      <div className="goal-actions">
        <input placeholder="Deposit amount" />
        <button>Add Deposit</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default GoalItem;