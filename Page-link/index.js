const http = require('http');
const fs = require('fs');

const port =8000;
const app = http.createServer((req,res)=>{
    let filename ="";
    switch(req.url){
        case "/":
            filename = "./index.html";
            break;
            case "/about":
                filename = "./about.html";
                break;
                case "/contact":
                    filename = "./contact.html";
                    break;
                case "/product":
                    filename = "./product.html";
                    break;
                    default:
                        filename = "./404.html";
    }
    fs.readFile(filename,(err,pagename) =>
    {
        if(err){
            console.log(err);
        return false;
        }
        res.end(pagename) 
    })
})

app.listen(port, (err) =>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is running on port :- ${port}`);
    
})