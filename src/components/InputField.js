// Componente de input reutilizable para formularios
export default function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  maxLength,
  placeholder,
  className = "",
  ...props
}) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`border border-blue-200 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base bg-white/90 dark:bg-gray-800/80 shadow-sm text-gray-900 dark:text-white ${className}`}
        {...props}
      />
    </div>
  );
}
