# Weekly Planner

Projeto de cronograma semanal para organizar tarefas por dia e horário.

---

## Requisitos

- [Node.js](https://nodejs.org/en/) instalado (para rodar o json-server)
- Extensão **Live Server** (recomendada) ou outro servidor local para rodar o frontend

---

## Como rodar o projeto

### 1. Rodar o backend com json-server

No terminal, dentro da pasta do projeto, rode:
```bash
npx json-server --watch db.json --port 3001
```
Isso vai iniciar o servidor backend no endereço:

http://localhost:3001

### 2. Rodar o frontend

Abra o projeto com um servidor local, por exemplo:

Usando Live Server no VSCode: clique com o botão direito no index.html e escolha Open with Live Server


### 3. Acessar o projeto

No navegador, abra a URL do servidor local, exemplo:

http://127.0.0.1:5500 ou http://localhost:5500


### Observações importantes

O projeto depende do backend json-server para salvar e carregar as tarefas.

Sem o json-server rodando, as tarefas não serão persistidas nem carregadas.

O script usa módulos ES6 (type="module"), por isso precisa rodar em servidor local — abrir o arquivo diretamente não funciona.


### Tecnologias usadas

JavaScript ES6+ (módulos)

JSON Server (simulação de backend REST)

HTML e CSS

### Autor

Luis Pamplona
https://github.com/LuisFPamplona