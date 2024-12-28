// expressを使用
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/fib", (req, res) => {

    // クエリパラメータを取得
    const n = req.query.n;

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
        "result": result
    });
})

// 第n項のフィボナッチ数を求める関数
/*
function fibonacci(n) {
    if(n == 1) {
        return 1;
    } else if(n == 2) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}*/
function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1; 
    }
    let f1 = 1;
    let f2 = 1;
    let f;
    for (let i = 3; i <= n; i++) {
        f = f1 + f2;
        f1 = f2;
        f2 = f;
    }
    return f2;
}


app.listen(port, () => {
    console.log(`App Listening at ${url}`);
})