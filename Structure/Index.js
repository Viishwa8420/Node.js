const http = require('http');
const app = http.createServer((req,res) =>
{
    res.write("<h1>Har Har Mahadev</h1>");
    res.write("<h2>Har Har Mahadev</h2>");
    res.write("<h3>Har Har Mahadev</h3>");
    res.end();
})
app.listen(8080)