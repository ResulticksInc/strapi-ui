import React from 'react';
import { Loader2 } from 'lucide-react';

const FormButton = ({ children, loading, variant = 'primary', ...props }) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`me-3 btn btn-${variant} ${props.className || ''}`}
    >
      {loading ? (
        <span className="d-flex align-items-center">
          <Loader2 className="spinner-border spinner-border-sm me-2" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default FormButton;