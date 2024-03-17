import React, { useState } from 'react';
import { SIGNUP_API_URL } from '../data/members';


const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    major: '',
    classification: 'Freshman',
    expectedGraduation: '2024-05'
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
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            major: 'Computer Science',
            classification: 'Freshman',
            expectedGraduation: 'None'
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
      <form
          className="bg-dark-surface-variant rounded-lg grid font-bold ring-1 ring-inset ring-white/[.3] p-8"
          onSubmit={handleSubmit}>
          <div className="flex justify-between">
              <div className="relative">
                  <input
                      className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                  />
                  <label
                      className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/[.4]"
                      htmlFor="firstName"
                  >
                      First Name
                  </label>
              </div>
              <div className="relative">
                  <input
                      className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                  />
                  <label
                      className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
                      htmlFor="lastName"
                  >
                      Last Name
                  </label>
              </div>
          </div>
          <div className="relative mt-4">
              <input
                  className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
              />
              <label
                  className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
                  htmlFor="email"
              >
                  Email
              </label>
          </div>
          <div className="relative mt-4">
              <input
                  className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
              />
              <label
                  className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
                  htmlFor="phone"
              >
                  Phone
              </label>
          </div>
          <div className="flex flex-col mt-4">
              <label htmlFor="major">Major</label>
              <select
                  className="bg-dark-surface-variant font-normal rounded mt-1 p-2 ring-1 ring-inset ring-white/[.3]"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  required
              >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Management Information System">MIS</option>
                  <option value="Computer Information System">CIS</option>
                  <option value="Other">Other</option>
              </select>
          </div>
          <div className="flex flex-col mt-4">
              <label htmlFor="classification">Classification</label>
              <select
                  className="bg-dark-surface-variant font-normal rounded mt-1 p-2 ring-1 ring-inset ring-white/[.3]"
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
          </div>
          <div className="flex flex-col mt-4">
              <label htmlFor="expectedGraduation">Expected Graduation</label>
              <input
                  className="bg-dark-surface-variant font-normal rounded mt-1 p-2 ring-1 ring-inset ring-white/[.3]"
                  type="month"
                  id="expectedGraduation"
                  name="expectedGraduation"
                  min="2024-05"
                  value={formData.expectedGraduation}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="table text-black my-0 mx-auto mt-6">
              <button
                  className="bg-dark-surface-variant hover:bg-dark-primary/[.6] px-4 h-10 items-center text-center text-white rounded-lg ring-1 ring-inset ring-white"
                  type="submit"
              >
                  Join
              </button>
          </div>
      </form>
);
};

export default SignUpForm;
