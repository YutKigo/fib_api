const request = require('supertest'); // HTTPリクエストをテストするライブラリ
const app = require('./app'); // app.js をインポート

describe('GET /fib', () => {
    test('should return the correct Fibonacci number for valid input', async () => {
        const response = await request(app).get('/fib').query({ n: 10 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: 55 });
    });

    test('should handle invalid input (non-integer)', async () => {
        const response = await request(app).get('/fib').query({ n: 'abc' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            status: 400,
            message: 'Bad request.'
        });
    });

    test('should handle invalid input (negative number)', async () => {
        const response = await request(app).get('/fib').query({ n: -5 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            status: 400,
            message: 'Bad request.'
        });
    });

    test('should handle invalid input (zero)', async () => {
        const response = await request(app).get('/fib').query({ n: 0 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            status: 400,
            message: 'Bad request.'
        });
    });

    test('should return 1 for n=1', async () => {
        const response = await request(app).get('/fib').query({ n: 1 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: 1 });
    });

    test('should return 1 for n=2', async () => {
        const response = await request(app).get('/fib').query({ n: 2 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: 1 });
    });
});
