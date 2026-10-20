# Escola Speak Up

## Iniciar o sistema no Windows

1. Na primeira execução, o atalho cria `back-end/.env` e pede que você informe a senha do PostgreSQL no Bloco de Notas.
2. Dê dois cliques em `iniciar.bat`. Na primeira execução, ele instala as dependências que estiverem faltando e abre o back-end e o front-end em janelas separadas.
3. Acesse <http://localhost:5173>. A API fica disponível em <http://localhost:3000>.

O PostgreSQL precisa estar ativo e a senha em `back-end/.env` precisa corresponder ao usuário configurado no banco. A API inicia mesmo sem conexão com o banco; nesse caso, salvar e listar candidatos não funcionará até a conexão ser configurada. Consulte <http://localhost:3000/health> para verificar o estado da conexão.
