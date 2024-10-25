import React from 'react';

const FormInput = ({ label, error, ...props }) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {label}
      </label>
      <input
        {...props}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormInput;