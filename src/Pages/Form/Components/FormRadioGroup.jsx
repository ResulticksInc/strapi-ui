import React from 'react';

const FormRadioGroup = ({ label, options, error, ...props }) => {
  return (
    <div className="mb-3">
      <label className="form-label d-block">{label}</label>
      {options.map(option => (
        <div key={option.value} className="form-check form-check-inline">
          <input
            type="radio"
            {...props}
            value={option.value}
            checked={props.value === option.value}
            className={`form-check-input ${error ? 'is-invalid' : ''}`}
            id={`${props.name}-${option.value}`}
          />
          <label className="form-check-label" htmlFor={`${props.name}-${option.value}`}>
            {option.label}
          </label>
        </div>
      ))}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default FormRadioGroup;