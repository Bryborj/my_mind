/*
  Mejoras minimalistas y responsive:
  - Fondo sutil, tarjetas flotantes, tipografía limpia.
  - Espaciados y tamaños adaptativos.
  - Botón de acción destacado y limpio.
*/

import { useState } from "react";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import FrequencySelect from "../components/FrequencySelect";
import ReminderCheckbox from "../components/ReminderCheckbox";
import ErrorMessage from "../components/ErrorMessage";

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
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
            <div className="w-full max-w-md mx-auto mt-12 p-8 sm:p-10 rounded-3xl shadow-xl border border-blue-100 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white drop-shadow-lg tracking-tight">
                    Crear nuevo hábito
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <InputField
                        id="habit-title"
                        label="Nombre del hábito"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ej: Leer 10 páginas"
                        maxLength={50}
                        required
                    />
                    <TextAreaField
                        id="habit-description"
                        label="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe tu hábito"
                        maxLength={200}
                        rows={3}
                    />
                    <FrequencySelect
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        required
                    />
                    <ReminderCheckbox
                        checked={reminder}
                        onChange={(e) => setReminder(e.target.checked)}
                    />
                    <ErrorMessage>{error}</ErrorMessage>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 transition-colors shadow-lg text-lg tracking-wide"
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