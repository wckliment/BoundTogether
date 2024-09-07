import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExchangeRequests, thunkUpdateExchangeRequest } from '../../redux/exchangeRequests';
import './ExchangeRequest.css';

const ExchangeRequestPage = () => {
  const dispatch = useDispatch();
  const exchangeRequests = useSelector((state) => state.exchangeRequests.exchangeRequests);

  useEffect(() => {
    dispatch(thunkGetExchangeRequests());
  }, [dispatch]);

  const handleStatusUpdate = (requestId, newStatus) => {
    dispatch(thunkUpdateExchangeRequest(requestId, newStatus));
  };

  return (
    <div className="exchange-request-page">
      <h1>Exchange Requests</h1>
      <div className="exchange-requests-list">
        {exchangeRequests.length > 0 ? (
          exchangeRequests.map((request) => (
            <div key={request.id} className="exchange-request-tile">
              {/* Ensure request and request.book exist before accessing their properties */}
              {request.book ? (
                <>
                  <h3>Book: {request.book.title}</h3>
                  <p>Requested by: {request.requester.username}</p>
                  <p>Owner: {request.owner.username}</p>
                  <p>Status: {request.status}</p>
                  {request.due_date && <p>Due Date: {new Date(request.due_date).toLocaleDateString()}</p>}
                  <div className="actions">
                    {request.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusUpdate(request.id, 'accepted')}>Accept</button>
                        <button onClick={() => handleStatusUpdate(request.id, 'rejected')}>Reject</button>
                      </>
                    )}
                    {request.status === 'accepted' && (
                      <button onClick={() => handleStatusUpdate(request.id, 'completed')}>Mark as Completed</button>
                    )}
                  </div>
                </>
              ) : (
                <p>Book information not available</p>  // Handle the case where book details are missing
              )}
            </div>
          ))
        ) : (
          <p>No exchange requests available</p>
        )}
      </div>
    </div>
  );
};

export default ExchangeRequestPage;
