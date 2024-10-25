import React from 'react';

const FormSelect = ({ label, options, error, ...props }) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {label}
      </label>
      <select
        {...props}
        className={`form-select ${error ? 'is-invalid' : ''}`}
      >
        <option value="">-- Select --</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormSelect;