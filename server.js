const express = require("express");

const app = express();

app.use(express.json());

// Lista de pedidos para teste
let pedidos = [
    {
        id: 1,
        cliente: "LogiTech",
        peso: 10,
        destino: "SP"
    },
    {
        id: 2,
        cliente: "Empresa ABC",
        peso: 20,
        destino: "SC"
    }
];

// GET /api/v1/pedidos/:id
app.get("/api/v1/pedidos/:id", (req, res) => {
    const id = Number(req.params.id);

    const pedido = pedidos.find(p => p.id === id);

    if (!pedido) {
        return res.status(404).json({
            erro: "Pedido não encontrado."
        });
    }

    res.status(200).json(pedido);
});

// DELETE /api/v1/pedidos/:id
app.delete("/api/v1/pedidos/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = pedidos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: "Pedido não encontrado."
        });
    }

    pedidos.splice(indice, 1);

    res.status(200).json({
        mensagem: "Pedido excluído com sucesso."
    });
});

// POST /api/v1/pedidos
app.post("/api/v1/pedidos", (req, res) => {
    const { cliente, peso, destino } = req.body;

    // Regra de negócio: peso deve ser maior que zero
    if (peso <= 0) {
        return res.status(400).json({
            erro: "O peso deve ser maior que zero."
        });
    }

    if (!cliente || !destino || peso === undefined) {
        return res.status(400).json({
            erro: "Cliente, peso e destino são obrigatórios."
        });
    }

    const novoPedido = {
        id: pedidos.length + 1,
        cliente,
        peso,
        destino
    };

    pedidos.push(novoPedido);

    res.status(201).json(novoPedido);
});

// Exporta o app para o Jest/Supertest
module.exports = app;

// Inicia o servidor somente quando executar diretamente o server.js
if (require.main === module) {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000.");
    });
}