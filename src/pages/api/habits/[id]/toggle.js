// src/pages/api/habits/[id]/toggle.js
import connectToDatabase from '@/lib/mongodb';
import Habit from '@/models/Habit';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { id } = req.query;
  const { date } = req.body; // debe ser 'YYYY-MM-DD'

  if (!date) return res.status(400).json({ error: 'Se requiere la fecha para el toggle' });

  try {
    await connectToDatabase();

    const habit = await Habit.findById(id);
    if (!habit) return res.status(404).json({ error: 'Hábito no encontrado' });

    const index = habit.completedDates.indexOf(date);

    if (index === -1) {
      // Si la fecha no está, agregarla (marcar completado)
      habit.completedDates.push(date);
    } else {
      // Si ya estaba, quitarla (desmarcar completado)
      habit.completedDates.splice(index, 1);
    }

    await habit.save();

    return res.status(200).json(habit);
  } catch (error) {
    console.error('Error al actualizar hábito:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
