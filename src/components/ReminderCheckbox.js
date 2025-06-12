// Componente para el checkbox de recordatorio
export default function ReminderCheckbox({ checked, onChange }) {
  return (
    <label className="flex items-center gap-3 text-base font-medium text-gray-500 dark:text-gray-300 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-blue-600 focus:ring-2 focus:ring-blue-400 w-5 h-5 rounded"
      />
      Activar recordatorio diario
    </label>
  );
}
