const Book = require("../models/Book");
const ExchangeRequest = require("../models/ExchangeRequest");

const createExchangeRequest = async (req, res) => {
  const { bookId } = req.body; // Book that User A wants to exchange
  const userId = req.user.id; // User A (the requester)
  const userName = req.user.name;
  console.log(userName);
  try {
    // Find the book by its ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if the owner of the book is not the same as the requester
    if (book.owner.equals(userId)) {
      return res
        .status(400)
        .json({ error: "You cannot request your own book" });
    }

    // Create an exchange request
    const request = await ExchangeRequest.create({
      requester: userId, // User A
      requesterName: userName,
      book: bookId, // Book owned by User B
      receiver: book.owner, // User B
      bookTitle: book.title,
      status: "pending",
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: "Error creating exchange request" });
  }
};

const respondToRequest = async (req, res) => {
  const { requestId, status } = req.body; // requestId of the exchange request, status can be 'accepted' or 'rejected'

  console.log(requestId, status);
  try {
    // Find the exchange request by its ID
    const request = await ExchangeRequest.findById(requestId);
    console.log(request);

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Only the owner of the book can respond to the request
    const book = await Book.findById(request.book);
    console.log(book);
    if (!book.owner.equals(req.user.id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to respond to this request" });
    }

    // Update request status
    request.status = status;
    await request.save();

    // If the request is accepted, update the book ownership
    if (status === "accepted") {
      const book = await Book.findById(request.book);
      book.owner = request.requester;
      book.ownerName = request.requesterName;
      await book.save();
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: "Error responding to request" });
  }
};

// get all exchange requests for a user
const getExchangeRequests = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const requests = await ExchangeRequest.find({
      $or: [{ requester: userId }, { receiver: userId }],
    });
    console.log(requests);
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: "Error getting exchange requests" });
  }
};

module.exports = {
  createExchangeRequest,
  respondToRequest,
  getExchangeRequests,
};
