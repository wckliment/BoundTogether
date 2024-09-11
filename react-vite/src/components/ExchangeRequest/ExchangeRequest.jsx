import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExchangeRequests, thunkUpdateExchangeRequest } from '../../redux/exchangeRequests';
import LeftNav from '../LeftNav/LeftNav';
import './ExchangeRequest.css';

const ExchangeRequest = () => {
  const dispatch = useDispatch();
  const exchangeRequests = useSelector((state) => state.exchangeRequests.exchangeRequests);
  const currentUser = useSelector((state) => state.session.user); // Assuming your session state has the logged-in user

  useEffect(() => {
    dispatch(thunkGetExchangeRequests()); // Ensure you're calling the correct thunk
  }, [dispatch]);

  const handleStatusUpdate = (requestId, newStatus) => {
    dispatch(thunkUpdateExchangeRequest(requestId, newStatus));
  };

  return (
    <div className="exchange-request-page">
      <LeftNav />
      <div className="content-section">
        <h1>Exchange Requests</h1>
        <div className="exchange-requests-list">
          {exchangeRequests.length > 0 ? (
            exchangeRequests.map((request) => (
              <div key={request.id} className="exchange-request-tile">
                {request.book ? (
                  <>
                    <h3>Book: {request.book.title}</h3>
                    <p>Requested by: {request.requester.username}</p>
                    <p>Owner: {request.owner.username}</p>
                    <p>Status: {request.status}</p>
                    {request.due_date && <p>Due Date: {new Date(request.due_date).toLocaleDateString()}</p>}

                    {/* Only show the Accept and Reject buttons if the current user is the owner of the book */}
                    {currentUser.id === request.owner.id && request.status === 'pending' && (
                      <div className="actions">
                        <button className="accept" onClick={() => handleStatusUpdate(request.id, 'accepted')}>
                          Accept
                        </button>
                        <button className="reject" onClick={() => handleStatusUpdate(request.id, 'rejected')}>
                          Reject
                        </button>
                      </div>
                    )}

                    {/* Show the "Completed" button only if the status is accepted */}
                    {currentUser.id === request.owner.id && request.status === 'accepted' && (
                      <button className="completed" onClick={() => handleStatusUpdate(request.id, 'completed')}>
                        Mark as Completed
                      </button>
                    )}
                  </>
                ) : (
                  <p>Book information not available</p>
                )}
              </div>
            ))
          ) : (
            <p>No exchange requests available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRequest;
