const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/fib", (req, res) => {

    // クエリパラメータを取得し10進数整数に変換
    const n = parseInt(req.query.n, 10);

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
/*
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

// 行列累乗法を使ったフィボナッチ数計算
function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1n;  // BigInt型で1を返す
    }

    const matrix = [[1n, 1n], [1n, 0n]];
    const result = matrixPower(matrix, n - 1n);

    return result[0][0];  // F(n)が行列の[0][0]に格納される
}

// 行列を累乗する関数
function matrixPower(matrix, power) {
    let result = [[1n, 0n], [0n, 1n]];  // 単位行列
    let base = matrix;

    while (power > 0n) {
        if (power % 2n === 1n) {
            result = multiplyMatrices(result, base);
        }
        base = multiplyMatrices(base, base);
        power /= 2n;
    }

    return result;
}

// 行列の掛け算
function multiplyMatrices(a, b) {
    return [
        [
            a[0][0] * b[0][0] + a[0][1] * b[1][0],
            a[0][0] * b[0][1] + a[0][1] * b[1][1]
        ],
        [
            a[1][0] * b[0][0] + a[1][1] * b[1][0],
            a[1][0] * b[0][1] + a[1][1] * b[1][1]
        ]
    ];
}

app.listen(port, () => {
    console.log(`App Listening`);
})