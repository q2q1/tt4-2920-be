TT4 2920

TEST ROUTES

app.get("/", (req, res) => {
    console.log(req);
    //res.send('<h1>some html</h1>');
    return res.json({
        message: "Endpoint Home is working!"
    });
});

app.post("/test", (req, res) => {
    return res.json({
        message: "Endpoint Home is working!",
        data: {
            ok: true,
            age: 99
        }
    });
});