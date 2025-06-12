/*
  Mejoras minimalistas y responsive:
  - Fondo claro, tarjetas limpias, tipografía moderna.
  - Espaciados y tamaños adaptativos.
  - Tarjetas de hábitos con hover y mejor contraste.
*/

import { useEffect, useState, useCallback } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import axios from "axios";
import dayjs from "dayjs";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Footer from "../components/Footer";

const Dashboard = () => {
    const { user } = useUser();
    const { getToken, isLoaded, userId } = useAuth();
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const today = dayjs().format("YYYY-MM-DD");

    const fetchHabits = useCallback(async () => {
        try {
            const token = await getToken();
            const res = await axios.get("/api/habits", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setHabits(res.data);
        } catch (err) {
            console.error("❌ Error al obtener hábitos:", err);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        if (isLoaded && userId) {
            fetchHabits();
        }
    }, [isLoaded, userId, fetchHabits]);

    const toggleCompletion = async (habitId) => {
        try {
            await axios.put(`/api/habits/${habitId}/toggle`, { date: today });
            fetchHabits();
        } catch (err) {
            console.error("❌ Error al actualizar hábito:", err);
        }
    };

    const deleteHabit = async (habitId) => {
        try {
            const token = await getToken();
            await axios.delete("/api/habits", {
                headers: { Authorization: `Bearer ${token}` },
                data: { ids: [habitId] },
            });
            fetchHabits();
        } catch (err) {
            console.error("❌ Error al eliminar hábito:", err);
        }
    };

    if (loading) return <div className="p-8 text-center text-lg text-gray-500">Cargando hábitos...</div>;

    return (
        <>
        <section className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors py-10 px-2">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Hola, {user?.firstName} 👋</h1>
                    <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">Tus hábitos de hoy</h2>
                </div>
                <div className="grid gap-7 sm:grid-cols-2">
                    {habits.map((habit) => {
                        const completed = habit.completedDates?.includes(today);

                        const last7Days = Array.from({ length: 7 }).map((_, i) => {
                            const date = dayjs().subtract(6 - i, "day").format("YYYY-MM-DD");
                            const dayName = dayjs(date).format("dd");
                            const isCompleted = habit.completedDates?.includes(date);
                            return {
                                name: dayName,
                                completed: isCompleted ? 1 : 0,
                            };
                        });

                        let streak = 0;
                        for (let i = 0; i < 7; i++) {
                            const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
                            if (habit.completedDates?.includes(date)) {
                                streak++;
                            } else {
                                break;
                            }
                        }

                        return (
                            <div
                                key={habit._id}
                                className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/40 dark:to-gray-900/60 rounded-xl p-5 shadow border border-green-100 dark:border-green-900 hover:shadow-lg transition-all group flex flex-col justify-between min-h-[220px]"
                            >
                                <div>
                                    <h3 className="text-lg font-bold text-green-700 dark:text-green-300 group-hover:underline mb-1">{habit.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{habit.description}</p>
                                    <p className="text-xs text-green-600 dark:text-green-400 mb-2">
                                        Racha actual: <span className="font-bold">{streak}</span> día{streak === 1 ? "" : "s"}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <button
                                        onClick={() => toggleCompletion(habit._id)}
                                        className={`px-5 py-2 rounded-lg font-semibold shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base
                                            ${
                                                completed
                                                    ? "bg-green-500 text-white hover:bg-green-600"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                            }
                                        `}
                                        aria-label={completed ? "Desmarcar hábito" : "Marcar hábito como hecho"}
                                    >
                                        {completed ? "✅ Hecho" : "Marcar"}
                                    </button>
                                    <button
                                        onClick={() => deleteHabit(habit._id)}
                                        className="ml-2 px-3 py-2 rounded-lg font-semibold shadow transition-colors duration-200 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-900/70 focus:outline-none focus:ring-2 focus:ring-red-400 text-xs"
                                        aria-label="Eliminar hábito"
                                        title="Enviar a papelera"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <div className="h-20 sm:h-24 mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={last7Days}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis ticks={[0, 1]} domain={[0, 1]} />
                                            <Tooltip formatter={(value) => (value ? "Completado" : "No completado")} />
                                            <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {habits.length === 0 && (
                    <div className="text-center text-gray-400 dark:text-gray-500 mt-10 text-lg">No tienes hábitos aún. ¡Crea uno nuevo!</div>
                )}
            </div>
        </section>
        <Footer />
        </>
    );
};

export default Dashboard;
