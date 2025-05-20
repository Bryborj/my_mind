import { useState } from "react";
import { useRouter } from "next/router";

const CreateHabit = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("");
    const [reminder, setReminder] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!title.trim() || !frequency) {
            setError("Por favor, completa los campos obligatorios.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/habits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim(),
                    frequency,
                    reminder,
                }),
            });
            if (!res.ok) throw new Error("Error al guardar el hábito");
            router.push("/dashboard");
        } catch {
            setError("No se pudo guardar el hábito. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg mx-auto mt-12 p-10 rounded-3xl shadow-2xl border border-blue-100 backdrop-blur-md">
                <h1 className="text-4xl font-extrabold mb-10 text-center text-white-100 drop-shadow-lg tracking-tight">
                    Crear nuevo hábito
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                    <div>
                        <label
                            htmlFor="habit-title"
                            className="block mb-2 font-semibold"
                        >
                            Nombre del hábito <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="habit-title"
                            type="text"
                            placeholder="Ej: Leer 10 páginas"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-blue-200 px-5 py-3 rounded-xl w-full focus:outline-none focus:ring-4 focus:ring-blue-300 transition text-lg bg-white/90 shadow-sm text-black"
                            maxLength={50}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="habit-description"
                            className="block mb-2 font-semibold"
                        >
                            Descripción{" "}
                            <span className="text-yellow-400 font-normal">(opcional)</span>
                        </label>
                        <textarea
                            id="habit-description"
                            placeholder="Describe tu hábito"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-2 border-blue-200 px-5 py-3 rounded-xl w-full focus:outline-none focus:ring-4 focus:ring-blue-300 transition resize-none text-base bg-white/90 shadow-sm text-black"
                            maxLength={200}
                            rows={3}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="habit-frequency"
                            className="block mb-2 font-semibold"
                        >
                            Frecuencia <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="habit-frequency"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            className="border-2 border-blue-200 px-5 py-3 rounded-xl w-full bg-white/90 focus:outline-none focus:ring-4 focus:ring-blue-300 transition text-base shadow-sm text-black"
                            required
                        >
                            <option value="">Selecciona frecuencia</option>
                            <option value="diaria">Diaria</option>
                            <option value="semanal">Semanal</option>
                            <option value="mensual">Mensual</option>
                        </select>
                    </div>
                    <label className="flex items-center gap-3 text-base select-none font-medium text-gray-300">
                        <input
                            type="checkbox"
                            checked={reminder}
                            onChange={(e) => setReminder(e.target.checked)}
                            className="accent-blue-600 focus:ring-2 focus:ring-blue-400 w-5 h-5 rounded"
                        />
                        Activar recordatorio diario
                    </label>
                    {error && (
                        <div className="text-red-600 text-sm font-semibold bg-red-50 border border-red-200 rounded-lg px-4 py-2 shadow-sm">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-500 disabled:opacity-50 transition-colors shadow-lg text-lg tracking-wide"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Guardar hábito"}
                    </button>
                </form>
            </div>
        </main>
    );
};
export default CreateHabit;