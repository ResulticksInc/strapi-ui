import React from 'react';

const FormCheckbox = ({ label, error, ...props }) => {
  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          type="checkbox"
          {...props}
          className={`form-check-input ${error ? 'is-invalid' : ''}`}
        />
        <label htmlFor={props.id} className="form-check-label">
          {label}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default FormCheckbox;