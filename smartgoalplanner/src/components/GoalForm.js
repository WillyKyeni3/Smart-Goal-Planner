import React, {useState} from 'react';

// 
function GoalForm({ onGoalAdded }) {

    // State to manage form data
    const [formData, setFormData] = useState({
        name: '',
        targetAmount: "",
        savedAmount: "",
        category: '',
        deadline: ''
    });

    // Handle input changes (controlled components)
    // Using spread operator to update formData state
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // POST request to create a new goal
        fetch('http://localhost:4000/goals', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...formData,
                savedAmount: 0,
                createdAt: new Date().toISOString()
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create goal');
            }
            return response.json();
        })
        .then(() => {
            // Clear form
            setFormData({
                name: '',
                targetAmount: "",
                category: '',
                deadline: ''
            });
            // Refresh goals in parent component
            onGoalAdded();
        })
        .catch(error => {
            console.error('Error creating goal:', error);
            alert('Failed to create goal!');
        });
    };

    return (
        // Form for creating a new goal
        <form className="goal-form" onSubmit={handleSubmit}>
            <h3>Create New Goal</h3>
            <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Goal name" 
                required 
            />
            <input 
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="Target amount" 
                type="number" 
                min="0.01"
                step="0.01"
                required 
            />
            <input 
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category" 
                required 
            />
            <input 
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                type="date" 
                required 
            />
            <button type="submit">Add Goal</button>
        </form>
    );
}

export default GoalForm;