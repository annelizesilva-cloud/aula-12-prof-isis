const request = require("supertest");
const app = require("./server");

describe("GET /api/v1/pedidos/:id", () => {

    test("deve buscar um pedido existente e retornar 200", async () => {
        const res = await request(app)
            .get("/api/v1/pedidos/1");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("id", 1);
    });

    test("deve retornar 404 para um pedido inexistente", async () => {
        const res = await request(app)
            .get("/api/v1/pedidos/9999");

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("erro");
    });
});


describe("DELETE /api/v1/pedidos/:id", () => {

    test("deve excluir um pedido existente", async () => {
        const res = await request(app)
            .delete("/api/v1/pedidos/2");

        expect([200, 204]).toContain(res.statusCode);
    });
});


describe("POST /api/v1/pedidos", () => {

    test("deve rejeitar peso menor ou igual a zero", async () => {
        const res = await request(app)
            .post("/api/v1/pedidos")
            .send({
                cliente: "LogiTech",
                peso: -5,
                destino: "SP"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("erro");
    });
});
