import app from "./app.js";
import { criarTabelas } from "./database/database.js";
import { popularBanco } from "./seed/seed.js";

const PORT = 3000;

async function iniciar() {

  await criarTabelas();

  await popularBanco();

  app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
  });

}

iniciar();