import { pb } from "./pb.js";

export async function createReceta(data) {
  try {
    const receta = await pb.collection("recetas").create(data);
    return receta;
  } catch (error) {
    console.error("Error al crear receta:", error);
    throw error;
  }
}