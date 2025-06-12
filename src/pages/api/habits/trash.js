import { getAuth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import Habit from "@/models/Habit";

export default async function handler(req, res) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "No autenticado" });
    await connectToDatabase();

    if (req.method === "GET") {
      // Solo hábitos eliminados
      const habits = await Habit.find({ userId, deleted: true });
      return res.status(200).json(habits);
    }

    if (req.method === "PUT") {
      // Restaurar hábitos desde la papelera
      const { ids } = req.body;
      if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ error: "Se requiere un array de ids" });
      }
      await Habit.updateMany(
        { _id: { $in: ids }, userId },
        { $set: { deleted: false, deletedAt: null } }
      );
      return res.status(200).json({ message: "Hábitos restaurados" });
    }

    if (req.method === "DELETE") {
      // Borrado permanente
      const { ids } = req.body;
      if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ error: "Se requiere un array de ids" });
      }
      await Habit.deleteMany({ _id: { $in: ids }, userId });
      return res.status(200).json({ message: "Hábitos eliminados permanentemente" });
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor", detalle: error.message });
  }
}
