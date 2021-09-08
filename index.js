const express = require("express")
const app = express()

// estou dizendo para o express utilizar o ejs como renderizador do html, todos os arquivos html devem ser salvos dentro da pasta views
// por causa disso, dentro da pasta views os arquivos html devem ser salvos com .ejs
app.set("view engine", "ejs") 
app.use(express.static("public"))

app.get("/", function(req, res){
    res.render("index")
})

app.get("/perguntar", function(req, res){
    res.render("perguntar")
})

app.listen(8080, () => {
    console.log("APP RODANDO")
})