import React from "react";


export interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function TextInput({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  disabled = false,
  autoComplete = "off",
  error = false,
  errorMessage = "",
}: TextInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
          error
            ? "border border-red-500 focus:ring-red-500"
            : "border border-gray-300 focus:ring-blue-500"
        }`}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
