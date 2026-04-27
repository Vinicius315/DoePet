import app from "./app.js";
import { criarTabelas } from "./database/database.js";
import { popularBanco } from "./seed/seed.js";

const PORT = process.env.PORT || 3000; 

async function iniciar() {
  try {
    await criarTabelas();

   
    await popularBanco();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

iniciar();