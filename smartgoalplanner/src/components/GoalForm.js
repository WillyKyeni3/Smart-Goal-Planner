import React from 'react';

function GoalForm() {
  return (
    <form className="goal-form">
      <h3>Create New Goal</h3>
      <input placeholder="Goal name" />
      <input placeholder="Target amount" type="number" />
      <input placeholder="Category" />
      <input type="date" />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;