import { useEffect, useState } from "react";
import api from "../services/api"; 
import "./Home.css";

function Home() {
  const [totalItens, setTotalItens] = useState(0);
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDadosIniciais() {
      try {
        const [respOngs, respItens] = await Promise.all([
          api.get("/ongs"),
          api.get("/itens")
        ]);

        setOngs(respOngs.data); 
        const somaItens = respItens.data.reduce((acc, item) => acc + item.quantidade, 0); // 
        setTotalItens(somaItens);
        
      } catch (error) {
        console.error("Erro ao conectar com o back-end:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDadosIniciais();
  }, []);

  if (loading) {
    return <div className="loading">Carregando dados do DoePet...</div>;
  }

  return (
    <div className="home-container">
      {/* PAINEL DE ARRECADAÇÃO REAL */}
      <section className="stats-panel">
        <div className="stats-card">
          <h3>Total de Material Arrecadado</h3>
          <p className="number">{totalItens}</p>
          <span>unidades registradas no sistema</span>
        </div>
      </section>

      {/* LISTA DE ONGS DO BANCO DE DADOS */}
      <section className="ongs-section">
        <h2>Instituições Parceiras</h2>
        <div className="ongs-list">
          {ongs.length > 0 ? (
            ongs.map((ong) => (
              <div key={ong.id} className="ong-item">
                <span className="icon">🏠</span>
                <div className="info">
                  <strong>{ong.nome}</strong>
                  <small>{ong.endereco || "Endereço não informado"}</small>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhuma ONG encontrada no banco de dados.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;