import React, { useState } from 'react';
import { SIGNUP_API_URL } from '../data/members';


const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    paymentMethod: 'Venmo',
    firstName: '',
    lastName: '',
    discord: '',
    email: '',
    classification: 'Freshman',
    major: '',
    codingExperience: 'None'
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(SIGNUP_API_URL, {
        redirect: 'follow',
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Success! Your response has been recorded.');
        setFormData({
          paymentMethod: 'Venmo',
          firstName: '',
          lastName: '',
          discord: '',
          email: '',
          classification: 'Freshman',
          major: '',
          codingExperience: 'None'
        })
      } else {
        alert('Error submitting the form. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Error submitting the form. Please try again later.');
    }
  };

  return (
    <form className="grid text-center font-bold" onSubmit={handleSubmit}>
      <label htmlFor="paymentMethod">Payment Method</label>
      <select
        className="bg-dark-surface font-normal text-center mx-24 rounded mt-1 mb-4 py-1"
        id="paymentMethod"
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        required
      >
        <option value="Venmo">Venmo</option>
        <option value="Cash">Cash</option>
        <option value="Zelle">Zelle</option>
      </select>
      <label htmlFor="firstName">First Name</label>
      <input
        className="bg-dark-surface font-normal text-center mx-24 rounded mt-1 mb-4 py-1"
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        className="bg-dark-surface font-normal text-center mx-24 rounded mt-1 mb-4 py-1"
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <label htmlFor="discord">Discord Tag</label>
      <input
        className="bg-dark-surface font-normal text-center mx-24 rounded mt-1 mb-4 py-1"
        type="text"
        id="discord"
        name="discord"
        value={formData.discord}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        className="bg-dark-surface font-normal text-center mx-24 rounded mt-1 mb-4 py-1"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="classification">Classification</label>
      <select
        className="bg-dark-surface font-normal text-center mx-24 rounded mt-1 mb-4 py-1"
        id="classification"
        name="classification"
        value={formData.classification}
        onChange={handleChange}
        required
      >
        <option value="Freshman">Freshman</option>
        <option value="Sophomore">Sophomore</option>
        <option value="Junior">Junior</option>
        <option value="Senior">Senior</option>
      </select>
      <label htmlFor="major">Major</label>
      <input
        className="bg-dark-surface font-normal text-center mx-24 rounded mt-1 mb-4 py-1"
        type="text"
        id="major"
        name="major"
        value={formData.major}
        onChange={handleChange}
        required
      />
      <label htmlFor="codingExperience">Coding Experience</label>
      <select
        className="bg-dark-surface font-normal text-center mx-24 rounded mt-1 mb-4 py-1"
        id="codingExperience"
        name="codingExperience"
        value={formData.codingExperience}
        onChange={handleChange}
        required
      >
        <option value="None">None</option>
        <option value="Novice">Novice</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <div className="table text-black my-0 mx-auto">
        <button 
          className="bg-dark-primary w-40 h-10 text-dark-surface items-center text-center rounded leading-10"        
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
