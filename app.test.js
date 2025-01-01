const request = require('supertest'); // HTTPリクエストをテストするライブラリ
const app = require('./app'); // app.js をインポート

describe('fib_api', () => {

    // 正常な入力のテスト（n = 1）
    it('GET /fib?n=1 - success', async () => {
        const response = await request(app).get('/fib').query({ n: 1 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: 1 });
    });

    // 正常な入力のテスト（n = 10）
    it('GET /fib?n=10 - success', async () => {
        const response = await request(app).get('/fib').query({ n: 10 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: 55 });
    });

    // 0入力のテスト（n = 0）
    it('GET invalid input: 0', async () => {
        const response = await request(app).get('/fib').query({ n: 0 });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ status: 400, message: 'Bad request.' });
    });

    // 文字列入力のテスト（n = abc）
    it('GET invalid input: abc', async () => {
        const response = await request(app).get('/fib').query({ n: "abc" });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ status: 400, message: 'Bad request.' });
    });
})
