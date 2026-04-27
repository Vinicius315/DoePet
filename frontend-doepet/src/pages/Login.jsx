import { useState, useEffect } from "react";
import api from "../services/api"; 
import "./Login.css";

function Login() {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [itens, setItens] = useState([]);
  
  const [abaAtiva, setAbaAtiva] = useState("materiais");
  const [mensagens, setMensagens] = useState([]);


  async function carregarMeusItens() {
    try {
      const response = await api.get("/itens"); 
      setItens(response.data);
    } catch (err) {
      console.error("Erro ao carregar itens");
    }
  }

  async function carregarMensagens() {
    try {
      const response = await api.get("/mensagens", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagens(response.data);
    } catch (err) {
      console.error("Erro ao carregar mensagens");
    }
  }


  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, senha ,}); 
      if (response.data.token) {
        setToken(response.data.token);
        setIsLogged(true);
        carregarMeusItens();
      }
    } catch (err) {
      alert("Erro ao entrar: Verifique suas credenciais."); 
    }
  }

  async function handleAdicionar() {
    const nome = prompt("Nome do item:");
    const categoria = prompt("Categoria (racao, medicamento, limpeza):");
    const quantidade = parseInt(prompt("Quantidade:"));

    if (!nome || !categoria || isNaN(quantidade)) return;

    try {
      await api.post("/itens", 
        { nome, categoria, quantidade, ong_id: 1 }, 
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      alert("Item adicionado!");
      carregarMeusItens(); 
    } catch (err) {
      alert("Erro ao adicionar item.");
    }
  }

  async function handleEditar(item) {
    const novaQtd = parseInt(prompt(`Nova quantidade para ${item.nome}:`, item.quantidade));
    if (isNaN(novaQtd)) return;

    try {
      await api.put(`/itens/${item.id}`, 
        { ...item, quantidade: novaQtd },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Quantidade atualizada!");
      carregarMeusItens();
    } catch (err) {
      alert("Erro ao editar material.");
    }
  }

  async function handleExcluir(id) {
    if (!window.confirm("Deseja realmente excluir este item?")) return;
    try {
      await api.delete(`/itens/${id}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setItens(itens.filter(i => i.id !== id));
      alert("Item removido com sucesso!");
    } catch (err) {
      alert("Erro ao excluir. Verifique se você está logado.");
    }
  }

  async function handleNovaOng() {
    const nome = prompt("Nome da ONG:");
    const emailOng = prompt("E-mail da ONG:");
    const senhaOng = prompt("Senha da ONG:");
    const endereco = prompt("Endereço:");

    if (!nome || !emailOng || !senhaOng) return;

    try {
      await api.post("/ongs", {
        nome, email: emailOng, senha: senhaOng, endereco, urgencia: 3, latitude: -4.93, longitude: -37.97
      });
      alert("Nova ONG cadastrada com sucesso!");
    } catch (err) {
      alert("Erro ao cadastrar ONG.");
    }
  }


  if (!isLogged) {
    return (
      <div className="login-page">
        <form className="login-card" onSubmit={handleLogin}>
          <h2>Acesso ONG</h2>
          <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required />
          <button type="submit">Entrar no Sistema</button>
        </form>
      </div>
    );
  }

  return (
    <div className="painel-container">
      <header className="painel-header">
        <h2>Painel DoePet</h2>
        <div className="painel-nav">
          <button onClick={() => setAbaAtiva("materiais")}>Materiais</button>
          <button onClick={() => {setAbaAtiva("mensagens"); carregarMensagens();}}>Mensagens</button>
          <button onClick={handleNovaOng} className="btn-secondary">➕ Nova ONG</button>
          <button onClick={() => setIsLogged(false)} className="btn-sair">Sair</button>
        </div>
      </header>

      {abaAtiva === "materiais" && (
        <div className="conteudo-painel">
          <div className="sub-header">
            <h3>Gerenciar Materiais</h3>
            <button onClick={handleAdicionar} className="btn-add">Adicionar Item</button>
          </div>
          <div className="itens-lista">
            {itens.map(item => (
              <div key={item.id} className="item-row">
                <div className="item-info">
                  <strong>{item.nome}</strong>
                  <span>Qtd: {item.quantidade} | {item.categoria}</span>
                </div>
                <div className="item-acoes">
                  <button className="btn-edit" onClick={() => handleEditar(item)}>✏️ Editar</button>
                  <button className="btn-delete" onClick={() => handleExcluir(item.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {abaAtiva === "mensagens" && (
        <div className="conteudo-painel">
          <h3>Mensagens Recebidas</h3>
          <div className="mensagens-lista">
            {mensagens.length > 0 ? mensagens.map(msg => (
              <div key={msg.id} className="msg-row">
                <strong>{msg.nome} ({msg.email})</strong>
                <p>{msg.mensagem}</p>
              </div>
            )) : <p>Nenhuma mensagem nova.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;