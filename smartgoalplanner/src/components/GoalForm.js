import React, {useState} from 'react';

function GoalForm() {
    const [formData, setFormData] = useState({
        name: '',
        targetAmount: "",
        savedAmount: "",
        category: '',
        deadline: ''
    });
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