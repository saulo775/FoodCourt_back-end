import app from "./app";
var PORT = process.env.PORT || 5500;
app.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT));
});
