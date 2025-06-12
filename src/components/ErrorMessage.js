// Componente para mostrar mensajes de error
export default function ErrorMessage({ children }) {
  if (!children) return null;
  return (
    <div className="text-red-600 text-sm font-semibold bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 rounded-lg px-4 py-2 shadow-sm">
      {children}
    </div>
  );
}
