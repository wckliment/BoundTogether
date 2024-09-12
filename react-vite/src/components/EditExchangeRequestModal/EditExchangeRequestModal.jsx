import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkUpdateExchangeRequest } from '../../redux/exchangeRequests'; // Import the update thunk

const EditExchangeRequestModal = ({ request, onClose }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(request.status);
  const [dueDate, setDueDate] = useState(request.due_date ? new Date(request.due_date).toISOString().split('T')[0] : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRequestData = {
      status,
      due_date: dueDate, // Include the updated due date if available
    };

    dispatch(thunkUpdateExchangeRequest(request.id, updatedRequestData));
    onClose(); // Close the modal after submission
  };

  return (
    <div className="edit-exchange-request-modal">
      <h2>Edit Exchange Request</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <button type="submit">Update Request</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditExchangeRequestModal;
