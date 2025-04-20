import React, { useState } from 'react';
import axios from 'axios';

import { useFormContext } from '../../../MessageContext'; 
import { HeaderComponent, FooterComponent } from '../../../../src/components/common'; 

const Contact = () => {
  const { addMessage } = useFormContext();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' ,_id:''});
  const [showModal, setShowModal] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9006/feedback/message', formData);
      if (response.status === 200) {
        addMessage(formData);
        setShowModal(true);
      } else {
        alert('Error submitting feedback');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting feedback');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // navigate('/admin'); // Navigate to the admin page
  };

  return (
    <>
      <HeaderComponent />
      <br />
      <br />
      <div className="mx-auto mt-8 max-w-4xl p-8 border-4 border-black rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-3xl">Message and Feedback</h1>
          <p className="mt-4 text-gray-500 text-2xl">Feel free to contact us and give suggestions</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                className="w-full rounded-lg border-gray-200 p-4 pe-20 text-xl shadow-sm"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-20 text-xl shadow-sm"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                className="w-full rounded-lg border-gray-200 p-4 pe-20 text-xl shadow-sm"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <div className="relative">
              <textarea
                name="message"
                className="w-full rounded-lg border-gray-200 p-4 pe-20 text-xl shadow-sm"
                placeholder="Enter message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
              Submit
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl font-medium mb-4">Feedback Submitted Successfully!</p>
            <p className="text-gray-700">Your feedback has been successfully submitted. Thank you!</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterComponent />
    </>
  );
};

export default Contact;
