import React, { useState } from 'react';
import { SIGNUP_API_URL } from '../data/members';


const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    major: 'Computer Science',
    classification: 'Freshman',
    expected_graduation: '2024-05'
  });
  const [successMessage, setSuccessMessage] = useState<String>('');
  const [errorMessage, setErrorMessage] = useState<String>('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSuccessMessage('');
      setErrorMessage('');

      const response = await fetch(SIGNUP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const { success, error } = await response.json();

      if (success) {
        setSuccessMessage('Success! Contact us on discord to complete the payment.');
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            major: 'Computer Science',
            classification: 'Freshman',
            expected_graduation: 'None'
        });
      } else {
          setErrorMessage(`Error submitting the form: ${error}`);
      }
  };

  return (
      <form
          className="bg-dark-surface-variant rounded-lg grid ring-1 ring-inset ring-white/[.3] p-8"
          onSubmit={handleSubmit}>
          <div className="flex justify-between">
              <div className="relative">
                  <input
                      className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
                      type="text"
                      id="firstName"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoComplete="off"
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
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Last Name"
                      autoComplete="off"
                      required
                  />
                  <label
                      className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/[.4]"
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
                  autoComplete="off"
                  required
              />
              <label
                  className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/[.4]"
                  htmlFor="email"
              >
                  Email
              </label>
          </div>
          <div className="relative mt-4">
              <input
                  className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
                  type="tel"
                  pattern="[0-9]{10}"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  autoComplete="off"
                  required
              />
              <label
                  className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/[.4]"
                  htmlFor="phone"
              >
                  Phone
              </label>
          </div>
          <div className="flex flex-col mt-4">
              <label className="text-sm" htmlFor="major">Major</label>
              <select
                  className="bg-dark-surface-variant font-normal rounded mt-1 p-2 ring-1 ring-inset ring-white/[.3] focus:ring-dark-primary"
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
              <label className="text-sm" htmlFor="classification">Classification</label>
              <select
                  className="bg-dark-surface-variant font-normal rounded mt-1 p-2 ring-1 ring-inset ring-white/[.3] focus:ring-dark-primary"
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
                  <option value="Super Senior">Super Senior</option>
              </select>
          </div>
          <div className="flex flex-col mt-4">
              <label className="text-sm" htmlFor="expectedGraduation">Expected Graduation</label>
              <input
                  className="bg-dark-surface-variant font-normal rounded mt-1 p-2 pl-3 pr-1 ring-1 ring-inset ring-white/[.3] focus:ring-dark-primary"
                  type="month"
                  id="expectedGraduation"
                  name="expected_graduation"
                  min="2024-05"
                  value={formData.expected_graduation}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="flex mt-6">
              <div className="flex-1 basis-1/2 text-sm text-dark-error">
                  <span className="text-dark-primary-variant">{successMessage}</span>
                  <span className="text-dark-error">{errorMessage}</span>
              </div>
              <div className="">
                  <button
                      className="bg-dark-surface-variant hover:ring-dark-primary px-4 h-10 items-center text-center text-white rounded-lg ring-1 ring-inset ring-white"
                      type="submit"
                  >
                      Join
                  </button>
              </div>
          </div>
      </form>
  );
};

export default SignUpForm;
