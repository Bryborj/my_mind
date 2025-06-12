// Componente de textarea reutilizable para formularios
export default function TextAreaField({
  id,
  label,
  value,
  onChange,
  required = false,
  maxLength,
  placeholder,
  rows = 3,
  className = "",
  ...props
}) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
        {label} {required ? <span className="text-red-500">*</span> : <span className="text-yellow-400 font-normal">(opcional)</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={rows}
        className={`border border-blue-200 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none text-base bg-white/90 dark:bg-gray-800/80 shadow-sm text-gray-900 dark:text-white ${className}`}
        {...props}
      />
    </div>
  );
}
