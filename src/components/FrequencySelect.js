// Componente para el select de frecuencia
export default function FrequencySelect({ value, onChange, required = false }) {
  return (
    <div>
      <label htmlFor="habit-frequency" className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
        Frecuencia <span className="text-red-500">*</span>
      </label>
      <select
        id="habit-frequency"
        value={value}
        onChange={onChange}
        required={required}
        className="border border-blue-200 px-4 py-2 rounded-lg w-full bg-white/90 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base shadow-sm text-gray-900 dark:text-white"
      >
        <option value="">Selecciona frecuencia</option>
        <option value="diaria">Diaria</option>
        <option value="semanal">Semanal</option>
        <option value="mensual">Mensual</option>
      </select>
    </div>
  );
}
