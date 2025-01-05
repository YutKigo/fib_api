const express = require('express');
const app = express();


app.use(express.json());

app.get("/fib", (req, res) => {

    // クエリパラメータを取得し10進数整数に変換
    const n = parseInt(req.query.n, 10);

    // リクエストエラー処理（nが負またはnが非数）
    if(n <= 0 || isNaN(n)) {
        return res.status(400).json({
            "status": 400,
            "message": "Bad request."
        });
    }

    // フィボナッチ数の計算
    const result = fibonacci(n);

    // レスポンスをjson形式で返却
    res.json({
        "result": result.toString()
    });
})

// 第n項のフィボナッチ数を求める関数（メモ化を使用）
const memo = {}
function fibonacci(n) {
    // 第1, 2項は1
    if(n === 1 || n === 2) {
        return BigInt(1);
    }
    // memo内にあれば計算は不要
    if(n in memo) {
        return memo[n];
    }
    // memo内になければ漸化式で計算
    memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return memo[n];
}

// テスト環境では listen を実行しない
if(process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;