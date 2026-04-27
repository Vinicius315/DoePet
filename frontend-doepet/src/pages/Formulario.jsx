import { useState } from "react";
import "./Formulario.css";

function Formulario() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>🤝 Proposta de Parceria</h2>
        <p>Preencha os dados para nos ajudar a crescer.</p>
        
        <input type="text" placeholder="Nome da Instituição" className="form-input" required />
        <input type="email" placeholder="Seu melhor e-mail" className="form-input" required />
        <select className="form-input">
          <option>Selecione o tipo de parceria</option>
          <option>Doação de Alimentos</option>
          <option>Apoio Logístico</option>
          <option>Divulgação</option>
        </select>
        <textarea placeholder="Como você deseja nos ajudar?" className="form-textarea"></textarea>
        
        <button type="submit" className="form-btn">
          {enviado ? "Mensagem Enviada! ✅" : "Enviar Proposta"}
        </button>
      </form>
    </div>
  );
}

export default Formulario;