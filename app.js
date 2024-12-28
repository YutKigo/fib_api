const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/fib", (req, res) => {

    // クエリパラメータを取得し10進数整数に変換
    const n = BigInt(req.query.n, 10);

    // リクエストエラー処理（nが負またはnが非数）
    if(n <= 0 || isNaN(n)) {
        return res.json({
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
    if(n === 1n || n === 2n) {
        return 1n;
    }
    // memo内にあれば計算は不要
    if(n in memo) {
        return memo[n];
    }
    // memo内になければ漸化式で計算
    memo[n] = fibonacci(n - 1n) + fibonacci(n - 2n);
    return memo[n];
}
/*
function fibonacci(n) {
    if(n === 1) {
        return 1;
    } else if(n === 2) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}*/

app.listen(port, () => {
    console.log(`App Listening`);
})