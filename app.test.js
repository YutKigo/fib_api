const request = require('supertest'); // HTTPリクエストをテストするライブラリ
const app = require('./app'); // app.js をインポート

describe('fib_api', () => {

    // 正常な入力のテスト（n = 1）
    it('GET /fib?n=1 - success', async () => {
        const response = await request(app).get('/fib').query({ n: 1 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: "1" });
    });

    // 正常な入力のテスト（n = 10）
    it('GET /fib?n=10 - success', async () => {
        const response = await request(app).get('/fib').query({ n: 10 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: "55" });
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

    // 大きな入力のテスト（n = 1000）
    it('GET huge input: 1000', async () => {
        const response = await request(app).get('/fib').query({ n: 1000 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: "43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875" });
    });
})
