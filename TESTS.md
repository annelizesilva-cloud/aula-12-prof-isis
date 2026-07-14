# TESTS.md

# Roteiro Técnico de Testes - LogiTech

## Caso de Teste 01 – Cadastro de motorista com CNH única
Tipo de Teste: Caixa Preta
Nível: Integração

**Objetivo:**
Verificar se a API impede o cadastro de dois motoristas com a mesma CNH.

**Pré-condições:**
- API em execução.
- Banco de dados conectado.
- Não existe um motorista cadastrado com a CNH informada.

**Dados de entrada:**

**Primeira requisição**
```json
{
  "name": "João Silva",
  "cnh": "12345678901"
}
```

**Segunda requisição**
```json
{
  "name": "Pedro Souza",
  "cnh": "12345678901"
}
```

**Passos:**
1. Enviar a primeira requisição de cadastro.
2. Confirmar que o motorista foi cadastrado.
3. Enviar uma segunda requisição utilizando a mesma CNH.

**Resultado esperado:**
- A primeira requisição deve retornar sucesso (Status 201).
- A segunda requisição deve ser rejeitada.
- A API deve retornar uma mensagem informando que a CNH já está cadastrada (Status 409 ou conforme definido pela API).

---

## Caso de Teste 02 – Validação de campos obrigatórios
Tipo de Teste: Caixa Preta
Nível: Integração

**Objetivo:**
Verificar se o middleware de validação bloqueia requisições com campos obrigatórios ausentes.

**Pré-condições:**
- API em execução.
- Middleware de validação configurado.

**Dados de entrada:**

```json
{
  "cnh": "98765432100"
}
```

ou

```json
{
  "name": "Maria Oliveira"
}
```

**Passos:**
1. Enviar uma requisição de cadastro sem o campo "name".
2. Repetir o teste sem o campo "cnh".

**Resultado esperado:**
- A requisição não deve chegar ao banco de dados.
- A API deve retornar Status 400.
- A resposta deve informar que os campos obrigatórios não foram preenchidos.

---

## Caso de Teste 03 – Cadastro de itens da frota
Tipo de Teste: Caixa Branca
Nível: Unitário

**Objetivo:**
Verificar se cada item da frota é armazenado como um registro independente na tabela `Itens_frota`.

**Pré-condições:**
- API em execução.
- Banco de dados conectado.
- Existe uma frota cadastrada.

**Dados de entrada:**

```json
{
  "itens": [
    "Macaco hidráulico",
    "Triângulo",
    "Estepe"
  ]
}
```

**Passos:**
1. Enviar a requisição para adicionar os itens.
2. Consultar a tabela `Itens_frota` no banco de dados.

**Resultado esperado:**
- Cada item deve ser salvo em um registro separado.
- Não deve existir um único registro contendo todos os itens em formato de texto.

---

## Caso de Teste 04 – Tratamento de erro de conexão com o banco
Tipo de Teste: Caixa Branca
Nível: Integração

**Objetivo:**
Verificar se o errorHandler global trata corretamente falhas de conexão com o banco de dados.

**Pré-condições:**
- API em execução.
- Banco de dados temporariamente indisponível.

**Dados de entrada:**
- Requisição válida para qualquer rota que acesse o banco de dados.

**Passos:**
1. Interromper a conexão com o banco.
2. Enviar uma requisição para uma rota que consulta ou grava dados.

**Resultado esperado:**
- A aplicação não deve encerrar inesperadamente.
- O errorHandler deve capturar o erro.
- A API deve retornar Status 500.
- A resposta deve conter um JSON amigável informando que ocorreu um erro interno.

---

## Caso de Teste 05 – Listagem de grande volume de dados
Tipo de Teste: Caixa Preta
Nível: Integração

**Objetivo:**
Verificar o desempenho da rota de listagem com uma grande quantidade de registros.

**Pré-condições:**
- API em execução.
- Banco de dados contendo milhares de registros.

**Dados de entrada:**
- Requisição GET para a rota de listagem.

**Passos:**
1. Popular o banco com milhares de registros.
2. Executar a rota de listagem.
3. Medir o tempo de resposta.
4. Validar o conteúdo retornado.

**Resultado esperado:**
- A API deve retornar Status 200.
- O payload JSON deve estar completo e corretamente estruturado.
- Todos os registros devem ser retornados sem inconsistências.
- O tempo de resposta deve permanecer dentro do limite aceitável definido para a aplicação.
**Resultado esperado:**
- A API deve retornar Status 200.
- O payload JSON deve estar completo e corretamente estruturado.
- Todos os registros devem ser retornados sem inconsistências.
- O tempo de resposta deve permanecer dentro do limite aceitável definido para a aplicação.
