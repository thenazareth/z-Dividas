... Continuação do projeto acadêmico: https://github.com/LeoBardineo/zero-dividas


##Rodando local:

<p>O banco foi criado no PostgreSQL. Como o projeto ainda está em fase muito inicial, para realizar testes localmente, crie uma cópia do banco na sua máquina local. O SQl usado se encontra no arquivo \docs\zD - dataBase Arch.pdf. Copie e cole o código para criar o bd. Altere o arquivo example.env.txt no \backend para utilizar suas credencias e conectar o projeto ao seu banco local.</p>

frontend:
<ul>
    <li> na raiz do projeto, roda: npm install </li>
    <li> ainda na raiz, roda: npm run dev </li>
</ul>

frontend local: http://localhost:3000

Backend:
<ul>
    <li> entra no backend </li>
    <li> cria ambiente python: python -m venv venv </li>
    <li> inicia o ambiente no terminal: venv/Scripts/activate </li>
    <li> baixa os requisitos: python -m pip install -r requirements.txt </li>
    <li> roda o backend: python -m uvicorn main:app --reload</li>
</ul>

backend local: http://127.0.0.1:8000/docs
