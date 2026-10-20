import  { useState } from 'react';
import Nivelamento from './components/nivelamento';
import ListaCandidatos from './components/listaCandidatos';
import LoginSecre from './components/loginSecretaria';

function App() {
  const [pagina, setPagina] = useState('aluno'); // 'aluno', 'login' ou 'secretaria'
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const handleLoginSucesso = (usuario) => {
    setUsuarioLogado(usuario);
    setPagina('secretaria');
  };

  return (
    <div>
      <nav style={{ padding: '15px', background: '#1e3a8a', textAlign: 'center' }}>
        <button 
          onClick={() => setPagina('aluno')} 
          style={{ marginRight: '10px', padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', border: 'none' }}
        >
          Portal do Aluno (Teste)
        </button>

        {usuarioLogado ? (
          <button 
            onClick={() => setPagina('secretaria')} 
            style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', border: 'none' }}
          >
            Painel da Secretaria ({usuarioLogado.nome})
          </button>
        ) : (
          <button 
            onClick={() => setPagina('login')} 
            style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', border: 'none' }}
          >
            Login Secretaria
          </button>
        )}
      </nav>

      {pagina === 'aluno' && <Nivelamento />}
      {pagina === 'login' && <LoginSecre onLoginSucesso={handleLoginSucesso} />}
      {pagina === 'secretaria' && <ListaCandidatos />}
    </div>
  );
}

export default App;