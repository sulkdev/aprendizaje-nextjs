import mongoose from "mongoose";

declare global {
  // Extendemos la interfaz global para incluir mongoose cache
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
      }
    | undefined;
}
