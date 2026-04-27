import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import ongRoutes from "./routes/ongRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import doacaoRoutes from "./routes/doacaoRoutes.js";
import mensagemRoutes from "./routes/mensagemRoutes.js";

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/ongs", ongRoutes);
app.use("/itens", itemRoutes);
app.use("/doacoes", doacaoRoutes);
app.use("/mensagens", mensagemRoutes); 

export default app;