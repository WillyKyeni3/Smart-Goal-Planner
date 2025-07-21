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

    // Calculaate days left until deadline
    const today = new Date();
    const deadlineDate = new Date(goal.deadline);
    const timeDiff = deadlineDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const isOverdue = !isCompleted && deadlineDate < today;
    const isSoon = daysLeft <= 30 && !isCompleted && !isOverdue;

    // Handle input changes for editing
    const handleupdate = () => {
        // PATCH request to update goal
        fetch(`http://localhost:4000/goals/${goal.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editedGoal)
        })
        .then(response => {
            if (!response.ok) throw new Error('Update failed');
            return response.json();
        })
        .then(() => {
            setIsEditing(false); // Exit editing mode
            onGoalUpdated();
        })
        .catch(error => {
            console.error('Update error:', error);
            alert('Failed to update goal!');
        });
    }
        

    // Handle deposit action 
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
            {/* */}
            {isEditing ? (
                <>
                <input 
                   name="name"
                   value={editedGoal.name}
                   onChange={(e) => setEditedGoal({ ...editedGoal, name: e.target.value })}
                   placeholder="Goal name"
                   required
                />
                <input 
                    name="targetAmount"
                    type="number"
                    value={editedGoal.targetAmount}
                    onChange={(e) => setEditedGoal({ ...editedGoal, targetAmount: e.target.value })}
                    min="0.01"
                    step="0.01"
                    placeholder="Target amount"
                    required
                />

                {/* Edit form */}
                <select 
                    value={editedGoal.category}
                    onChange={(e) => setEditedGoal({ ...editedGoal, category: e.target.value })}
                >
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Vacation">Vacation</option>
                </select>

                <input 
                    name="deadline"
                    value={editedGoal.deadline.split('T')[0]} // Format date for input
                    onChange={(e) => setEditedGoal({ ...editedGoal, deadline: e.target.value })}
                    placeholder="Deadline"
                    type="date"
                    required
                />

                <button onClick={handleupdate}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
            <>

            <h3>{goal.name}</h3>
            <p> Target: KE {goal.targetAmount.toLocaleString()}</p>
            <p> Saved: KE {goal.savedAmount.toLocaleString()}</p>
            <p> Remaining: KE {(goal.targetAmount - goal.savedAmount).toLocaleString()}</p>
            <p> Category: {goal.category}</p>
            <p> Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>


            {/* Add days left display */}
            <p>⏱️ Days Left: {daysLeft > 0 ? daysLeft : 'Overdue'}</p>


            {/* Progress bar */}
            <div className="progress-bar">
                <div style={{ width: `${progress}%` }}></div>
            </div>
            <p>Progress: {progress.toFixed(1)}%</p>

            {/* Status messages */}
            {isCompleted && <p className="completed">✅ Goal Completed!</p>}
            {isOverdue && <p className="overdue">⚠️ Goal Overdue!</p>}
            {isSoon && <p className="soon">⏳ Goal Due Soon!</p>}


            {/* Deposit input and buttons */}
            <div className="goal-actions">
                <input 
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Deposit amount"
                    min="0.01"
                />

                <button onClick={handleDeposit}>Add Deposit</button>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            </>

            )}
        </div>
    );
}

export default GoalItem;