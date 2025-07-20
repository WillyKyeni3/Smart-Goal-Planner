import React from 'react';

function GoalForm() {
  return (
    <form className="goal-form">
      <h3>Create New Goal</h3>
      <input placeholder="Goal name" required />
      <input placeholder="Target amount" type="number" required />
      <input placeholder="Category" required />
      <input type="date" required />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;