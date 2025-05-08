import mongoose from "mongoose";


const CheckScheme = new mongoose.Schema({

  identificador: {
    type: String,
    required: [true, "El identificador es obligatorio"],
    unique: true,
  },
  observaciones: {
    type: String,
    required: [false],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



// Verificamos si el modelo ya está creado para evitar errores en hot reload
export default mongoose.models.Check || mongoose.model("Check", CheckScheme);
