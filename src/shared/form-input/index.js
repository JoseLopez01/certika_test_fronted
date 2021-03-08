import React from "react";

function FormInput({form_errors, ...rest}) {
  let error = form_errors.includes(rest.name);
  return (
    <div className="form-group">
      <input {...rest }
        {...error && { className: "input-error" } } />
    </div>
  );
}

export default FormInput;
