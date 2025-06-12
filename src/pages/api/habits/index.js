import { getAuth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import Habit from "@/models/Habit";

export default async function handler(req, res) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "No autenticado" });

    await connectToDatabase();

    if (req.method === "GET") {
      // Solo hábitos no eliminados
      const habits = await Habit.find({ userId, deleted: { $ne: true } });
      return res.status(200).json(habits);
    }

    if (req.method === "POST") {
      const { title, description, frequency } = req.body;

      if (!title) {
        return res.status(400).json({ error: "El título es obligatorio" });
      }

      try {
        const newHabit = new Habit({
          userId,
          title,
          description,
          frequency,
          createdAt: new Date(),
        });

        await newHabit.save();
        return res
          .status(201)
          .json({ message: "Hábito creado exitosamente", habit: newHabit });
      } catch (error) {
        console.error("Error al guardar el hábito:", error);
        return res.status(500).json({ error: "Error al guardar el hábito" });
      }
    }

    if (req.method === "DELETE") {
      // Eliminar (enviar a papelera) uno o varios hábitos
      const { ids } = req.body; // array de ids
      if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ error: "Se requiere un array de ids" });
      }
      await Habit.updateMany(
        { _id: { $in: ids }, userId },
        { $set: { deleted: true, deletedAt: new Date() } }
      );
      return res.status(200).json({ message: "Hábitos enviados a la papelera" });
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    console.error("🔴 Error en API /habits:", error);
    return res
      .status(500)
      .json({ error: "Error del servidor", detalle: error.message });
  }
}
