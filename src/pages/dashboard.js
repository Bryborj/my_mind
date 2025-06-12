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

    if (loading) return <div className="p-8 text-center text-lg text-gray-500">Cargando hábitos...</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 sm:p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-800 dark:text-white">Hola, {user.firstName} 👋</h1>
            <h2 className="text-lg sm:text-xl mb-6 text-gray-600 dark:text-gray-300">Tus hábitos de hoy:</h2>
            <div className="flex flex-col gap-6">
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
                            className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/40 dark:to-gray-900/60 rounded-xl p-4 sm:p-5 shadow border border-green-100 dark:border-green-900 hover:shadow-lg transition-all group"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                                <div>
                                    <h3 className="text-lg font-bold text-green-700 dark:text-green-300 group-hover:underline">{habit.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{habit.description}</p>
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                                        Racha actual: <span className="font-bold">{streak}</span> día{streak === 1 ? "" : "s"}
                                    </p>
                                </div>
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
                            </div>
                            <div className="h-24 sm:h-28 mt-2">
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
        </div>
    );
};

export default Dashboard;
