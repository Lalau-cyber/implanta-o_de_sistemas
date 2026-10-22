import {useState} from 'react';
import './loginSecretaria.css';
import axios from 'axios';

export default function LoginSecre({onLoginSucesso}){
const [email, setEmail] = useState('');
const [senha, setSenha] = useState ('');
const [erro, setErro] = useState('');
const [carregando, setCarregando] = useState(false);

const handleSubmit = async (e) =>{
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try{
        const response = await axios.post('http://localhost:3000/api/login', {
            email, senha
        });

        if (response.data.usuario) {
            onLoginSucesso(response.data.usuario)
        }
    }catch(err){
        console.error(err);
        setErro(err.response?.data?.erro || 'Erro ao tentar fazer login. verifique as credenciais.');
    }finally{
        setCarregando(false);
    }
};
return(
<div className="login-container">
      <div className="login-card">
        <h2>Speak Up - Secretaria</h2>
        <p className="login-subtitle">Acesso Restrito à Equipe Administrativa</p>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="secretaria@speakup.com.br"
              required
            />
          </div>

          <div className="input-group">
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={carregando}>
            {carregando ? 'A entrar...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
);
}
