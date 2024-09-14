import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExchangeRequests, thunkUpdateExchangeRequest, thunkDeleteExchangeRequest } from '../../redux/exchangeRequests';
import LeftNav from '../LeftNav/LeftNav';
import './ExchangeRequest.css';

const ExchangeRequest = () => {
  const dispatch = useDispatch();
  const exchangeRequests = useSelector((state) => state.exchangeRequests.exchangeRequests);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetExchangeRequests());
  }, [dispatch]);

const handleStatusUpdate = (requestId, newStatus) => {
  const requestData = {
    status: newStatus,
  };

  dispatch(thunkUpdateExchangeRequest(requestId, requestData))
    .then(() => {
      console.log(`Request ${requestId} updated to ${newStatus}`);
    })
    .catch((err) => {
      console.error("Failed to update request:", err);
    });
};

  const handleDeleteRequest = (requestId) => {
    
    dispatch(thunkDeleteExchangeRequest(requestId));
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

                    {/* Accept/Reject buttons for owners */}
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

                    {/* Mark as Completed button */}
                    {currentUser.id === request.owner.id && request.status === 'accepted' && (
                      <button className="completed" onClick={() => handleStatusUpdate(request.id, 'completed')}>
                        Mark as Completed
                      </button>
                    )}

                    {/* Delete button */}
                    <button className="delete" onClick={() => handleDeleteRequest(request.id)}>
                      Delete Request
                    </button>
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
