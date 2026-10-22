import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListaCandidatos.css';

export default function ListaCandidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [erro, setErro] = useState('');

  // Carrega os candidatos assim que o componente é aberto
  useEffect(() => {
    carregarCandidatos();
  }, []);

  const carregarCandidatos = async () => {
    try {
      const response = await axios.get('/api/candidatos');
      setCandidatos(response.data);
    } catch (err) {
      console.error(err);
      setErro('Erro ao carregar a lista de candidatos do servidor.');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Secretaria Speak Up - Gestão de Nivelamento</h2>
        <p className="subtitulo-admin">Lista de alunos que completaram o teste de inglês.</p>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <div className="table-responsive">
          <table className="tabela-candidatos">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Pontuação</th>
                <th>Nível Indicado</th>
              </tr>
            </thead>
            <tbody>
              {candidatos.length > 0 ? (
                candidatos.map((c) => (
                  <tr key={c.id_candi || c.id}>
                    <td><strong>{c.nome}</strong></td>
                    <td>{c.telefone}</td>
                    <td>{c.email}</td>
                    <td>{c.pontuacao}%</td>
                    <td>
                      <span className="badge-nivel">
                        {c.nivelResultado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="sem-dados">Nenhum candidato registado até o momento.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}