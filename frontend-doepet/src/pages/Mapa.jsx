import "./Mapa.css";

function Mapa() {
  const locais = [
    { id: 1, nome: "Amigos dos Animais", lat: -4.92, lng: -37.97 },
    { id: 2, nome: "Patinhas Felizes", lat: -4.93, lng: -37.98 },
  ];

  return (
    <div className="mapa-container">
      <div className="mapa-header">
        <h1>📍 Mapa de Parceiros</h1>
        <p>Encontre as ONGs e pontos de distribuição mais próximos em Russas e região.</p>
      </div>

      <div className="mapa-layout">
        <div className="locais-lista">
          {locais.map(local => (
            <div key={local.id} className="local-item">
              <strong>{local.nome}</strong>
              <span>Ver no mapa →</span>
            </div>
          ))}
        </div>

        <div className="mapa-box">
          <iframe 
            title="Google Maps Russas"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31782.766324268!2d-37.9894348!3d-4.9258281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7bb26bf5d050c9b%3A0x63908f97e6878b77!2sRussas%20-%20CE!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Mapa;