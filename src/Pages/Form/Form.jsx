import { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import FormInput from './Components/FormInput';
import FormSelect from './Components/FormSelect';
import FormCheckbox from './Components/FormCheckbox';
import FormRadioGroup from './Components/FormRadioGroup';
import FormButton from './Components/FormButton';

const CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Singapore'];
const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

const initialFormData = {
  name: '',
  mobile: '',
  email: '',
  gender: '',
  city: '',
  isCustomer: false,
  agreeToTerms: false,
  captcha: ''
};

const Form = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    // if (!formData.captcha.trim()) newErrors.captcha = 'Captcha is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://resu.io/Subscription/IndexInsertAPITemp', formData);
      toast.success('Form submitted successfully!');
      console.log('Response:', response.data);
      setFormData(initialFormData);
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="">
          <div className="card shadow">
            <div className="card-body">
              <Toaster position="top-right" />
              <h2 className="card-title text-center mb-4">User Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter name"
          />

          <FormInput
            id="mobile"
            name="mobile"
            type="tel"
            label="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            error={errors.mobile}
            placeholder="Mobile number"
          />

          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="email@domain.com"
          />

          <FormRadioGroup
            name="gender"
            label="Gender"
            options={GENDER_OPTIONS}
            value={formData.gender}
            onChange={handleChange}
            error={errors.gender}
          />

          <FormSelect
            id="city"
            name="city"
            label="City"
            options={CITIES}
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />

          {/* <FormCheckbox
            id="isCustomer"
            name="isCustomer"
            label="Are you an existing customer?"
            checked={formData.isCustomer}
            onChange={handleChange}
          /> */}

          <FormCheckbox
            id="agreeToTerms"
            name="agreeToTerms"
            label={
              <>
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms & Conditions
                </a>
              </>
            }
            checked={formData.agreeToTerms}
            onChange={handleChange}
            error={errors.agreeToTerms}
          />

          {/* <FormInput
            id="captcha"
            name="captcha"
            type="text"
            label="Captcha"
            value={formData.captcha}
            onChange={handleChange}
            error={errors.captcha}
            placeholder="Enter the Captcha"
          /> */}

          <div className="flex gap-20">
            <FormButton
              type="button"
              variant="secondary"
              onClick={() => setFormData(initialFormData)}
            >
              Cancel
            </FormButton>
            <FormButton
              type="submit"
              loading={loading}
            >
              Submit
            </FormButton>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Form;
