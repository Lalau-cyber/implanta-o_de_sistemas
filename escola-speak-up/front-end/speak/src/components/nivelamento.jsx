import { useState } from 'react';
import axios from 'axios';
import './nivelamento.css';

// Lista de perguntas simples para simulação do Teste de Nivelamento
const perguntasIngles = [
  {
    id: 1,
    pergunta: '1. Complete the sentence: "Hello! My name ___ John."',
    opcoes: ['is', 'are', 'am', 'be'],
    respostaCorreta: 'is'
  },
  {
    id: 2,
    pergunta: '2. What is the plural of "child"?',
    opcoes: ['childs', 'children', 'childrens', 'childes'],
    respostaCorreta: 'children'
  },
  {
    id: 3,
    pergunta: '3. Complete: "Where ___ you live?"',
    opcoes: ['does', 'are', 'do', 'is'],
    respostaCorreta: 'do'
  },
  {
    id: 4,
    pergunta: '4. Choose the correct past tense: "Yesterday, I ___ to the school."',
    opcoes: ['go', 'went', 'gone', 'going'],
    respostaCorreta: 'went'
  }
];

export default function Nivelamento() {
  // Controle de Etapa: 1 = Cadastro de Contacto | 2 = Teste de Inglês | 3 = Resultado Final
  const [etapa, setEtapa] = useState(1);

  // Dados de contacto
  const [candidato, setCandidato] = useState({
    nome: '',
    telefone: '',
    email: ''
  });

  // Respostas do teste
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  // Manipular inputs de contacto
  const handleContactoChange = (e) => {
    setCandidato({ ...candidato, [e.target.name]: e.target.value });
  };

  // Avançar do cadastro para a prova
  const handleIniciarTeste = (e) => {
    e.preventDefault();
    if (candidato.nome && candidato.email && candidato.telefone) {
      setEtapa(2);
    } else {
      setErro('Por favor, preencha todos os campos do cadastro.');
    }
  };

  // Selecionar opções do teste
  const handleRespostaChange = (perguntaId, opcao) => {
    setRespostas({ ...respostas, [perguntaId]: opcao });
  };

  // Finalizar a prova, calcular pontuação e enviar ao Backend
  const handleFinalizarTeste = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    // Calcular Pontuação
    let acertos = 0;
    perguntasIngles.forEach((q) => {
      if (respostas[q.id] === q.respostaCorreta) {
        acertos++;
      }
    });

    const pontuacaoFinal = Math.round((acertos / perguntasIngles.length) * 100);

    // Definir Nível baseado na Pontuação
    let nivel = 'Básico';
    if (pontuacaoFinal >= 75) {
      nivel = 'Avançado';
    } else if (pontuacaoFinal >= 50) {
      nivel = 'Intermediário';
    }

    const dadosCompletos = {
      ...candidato,
      pontuacao: pontuacaoFinal,
      nivelResultado: nivel
    };

    try {
      // Envio final para a API Node.js/Sequelize
      await axios.post('/api/candidatos', dadosCompletos);
      setResultado(dadosCompletos);
      setEtapa(3); // Avança para a tela final de resultado
    } catch (err) {
      console.error(err);
      setErro('Erro ao salvar os dados no servidor. Verifique a conexão.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="speakup-container">
      <div className="form-card">
        <h2>Escola de Idiomas Speak Up</h2>

        {/* ETAPA 1: FORMULÁRIO DE CADASTRO DE CONTACTO */}
        {etapa === 1 && (
          <div>
            <h3>Você se cadastrará ou é da secretaria?</h3>
            {erro && <p className="mensagem-erro">{erro}</p>}
            <form onSubmit={handleIniciarTeste}>
              <div className="input-group">
                <label>Nome Completo:</label>
                <input
                  type="text"
                  name="nome"
                  value={candidato.nome}
                  onChange={handleContactoChange}
                  placeholder="Digite seu nome"
                  required
                />
              </div>

              <div className="input-group">
                <label>Telefone / WhatsApp:</label>
                <input
                  type="text"
                  name="telefone"
                  value={candidato.telefone}
                  onChange={handleContactoChange}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <div className="input-group">
                <label>E-mail:</label>
                <input
                  type="email"
                  name="email"
                  value={candidato.email}
                  onChange={handleContactoChange}
                  placeholder="exemplo@email.com"
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Ir para o Teste de Inglês →
              </button>
            </form>
          </div>
        )}

        {/* ETAPA 2: TESTE DE NIVELAMENTO EM INGLÊS */}
        {etapa === 2 && (
          <div>
            <h3>Teste de Nivelamento</h3>
            <p className="subtitulo">Responda às questões abaixo para avaliar o seu nível de inglês:</p>
            {erro && <p className="mensagem-erro">{erro}</p>}

            <form onSubmit={handleFinalizarTeste}>
              {perguntasIngles.map((q) => (
                <div key={q.id} className="questao-card">
                  <p className="pergunta-texto">{q.pergunta}</p>
                  <div className="opcoes-group">
                    {q.opcoes.map((opcao) => (
                      <label key={opcao} className="opcao-item">
                        <input
                          type="radio"
                          name={`pergunta-${q.id}`}
                          value={opcao}
                          checked={respostas[q.id] === opcao}
                          onChange={() => handleRespostaChange(q.id, opcao)}
                          required
                        />
                        <span>{opcao}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button type="submit" className="btn-submit" disabled={carregando}>
                {carregando ? 'A enviar resultado...' : 'Finalizar e Enviar Teste'}
              </button>
            </form>
          </div>
        )}

        {/* ETAPA 3: TELA DE RESULTADO FINAL */}
        {etapa === 3 && resultado && (
          <div className="resultado-card">
            <span className="icone-sucesso">🎉</span>
            <h3>Teste Concluído com Sucesso!</h3>
            <p>Obrigado por realizar o teste, <strong>{resultado.nome}</strong>.</p>

            <div className="placar-box">
              <div className="placar-item">
                <span>Pontuação:</span>
                <strong>{resultado.pontuacao}%</strong>
              </div>
              <div className="placar-item">
                <span>Nível Indicado:</span>
                <strong className="nivel-badge">{resultado.nivelResultado}</strong>
              </div>
            </div>

            <p className="info-secretaria">
              Os seus dados foram registados. A secretaria da <strong>Speak Up</strong> entrará em contacto através do e-mail ou WhatsApp para confirmar a sua matrícula na turma ideal.
            </p>

            <button
              className="btn-submit"
              onClick={() => {
                setEtapa(1);
                setCandidato({ nome: '', telefone: '', email: '' });
                setRespostas({});
              }}
            >
              Novo Teste
            </button>
          </div>
        )}
      </div>
    </div>
  );
}