import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    messageText: '',
    sender: '',
    recipient: '',
    deliveryDate: '',
    storytellingFormat: 'message in a bottle',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Create a Future Message</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Message Content:</label>
            <textarea
              name="messageText"
              placeholder="Enter your message here..."
              value={formData.messageText}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Sender:</label>
            <input
              type="text"
              name="sender"
              placeholder="Sender's name"
              value={formData.sender}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Recipient:</label>
            <input
              type="text"
              name="recipient"
              placeholder="Recipient's name"
              value={formData.recipient}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Delivery Date:</label>
            <input
              type="datetime-local"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Storytelling Format:</label>
            <select
              name="storytellingFormat"
              value={formData.storytellingFormat}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="message in a bottle">Message in a Bottle</option>
              <option value="message in the rocket">Message in the Rocket</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
