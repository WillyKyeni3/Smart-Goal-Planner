import React, { useState } from 'react';

function GoalItem({ goal, onGoalUpdated, onGoalDeleted }) {
    // State to manage editing mode
    const [isEditing, setIsEditing] = useState(false);
    // State to manage edited goal data
    const [editedGoal, setEditedGoal] = useState(goal);
    // State to manage deposit amount input
    const [depositAmount, setDepositAmount] = useState("");
    
    // Calculate progress percentage
    const progress = Math.min(100, (goal.savedAmount / goal.targetAmount) * 100);
    const isCompleted = goal.savedAmount >= goal.targetAmount;
    
    const handleDeposit = () => {
        if (!depositAmount || depositAmount <= 0) return;
        
        // PATCH request to update saved amount
        fetch(`http://localhost:4000/goals/${goal.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                savedAmount: goal.savedAmount + Number(depositAmount)
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Deposit failed');
            return response.json();
        })
        .then(() => {
            setDepositAmount(""); // Clear input field
            onGoalUpdated();
        })
        .catch(error => {
            console.error('Deposit error:', error);
            alert('Failed to make deposit!');
        });
    };

    // Handle goal deletion
    // Confirm before deleting
    const handleDelete = () => {
        if (!window.confirm("Delete this goal?")) return;
        
        // DELETE request with .then()
        fetch(`http://localhost:4000/goals/${goal.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error('Delete failed');
            onGoalDeleted();
        })
        .catch(error => {
            console.error('Delete error:', error);
            alert('Failed to delete goal!');
        });
    };

    return (
        <div className="goal-card">
            <h3>{goal.name}</h3>
            <p> Target: KE {goal.targetAmount.toLocaleString()}</p>
            <p> Saved: KE {goal.savedAmount.toLocaleString()}</p>
            <p> Category: {goal.category}</p>
            <p> Deadline: {goal.deadline}</p>
            
            {/* Progress bar */}
            <div className="progress-bar">
                <div style={{ width: `${progress}%` }}></div>
            </div>
            <p>Progress: {progress.toFixed(1)}%</p>
            
            {/* Deposit input and buttons */}
            <div className="goal-actions">
                <input 
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Deposit amount"
                />
                <button onClick={handleDeposit}>Add Deposit</button>
                <button>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default GoalItem;