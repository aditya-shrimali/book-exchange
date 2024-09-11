import { useState, useEffect } from "react";
import { getExchangeRequests, respondToRequest } from "../api";

const ExchangeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  console.log(userId);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getExchangeRequests();
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleResponse = async (requestId, response) => {
    try {
      await respondToRequest(requestId, response);
      setRequests(requests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold">Loading requests...</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Exchange Requests
      </h1>
      {requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li
              key={request._id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-lg mb-2">
                Request for <strong>{request.bookTitle}</strong> from{" "}
                <span className="text-blue-500">{request.requesterName} </span>
                <div
                  className={`ml-2 px-2 py-1 w-fit rounded ${
                    request.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : request.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Status: {request.status}
                </div>
              </p>

              {request.receiver === userId && request.status === "pending" && (
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                    onClick={() => handleResponse(request._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                    onClick={() => handleResponse(request._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No exchange requests available.
        </p>
      )}
    </div>
  );
};

export default ExchangeRequests;
