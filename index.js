const express = require("express")
const app = express()
const connection = require("./database/database")
const Pergunta = require("./database/model_pergunta")
const pergunta_model = require("./database/model_pergunta")
const sequelize = require("sequelize")


// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

// estou dizendo para o express utilizar o ejs como renderizador do html, todos os arquivos html devem ser salvos dentro da pasta views
// por causa disso, dentro da pasta views os arquivos html devem ser salvos com .ejs
app.set("view engine", "ejs") 
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))  // no lugar do body-parser traduz a entrada de formulários para ser utilizada nas rotas
app.use(express.json())

// ROTAS
app.get("/", function(req, res){
    pergunta_model.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
        attributes: [
            'id',
            'titulo',
            'descricao',
            [sequelize.fn('date_format', sequelize.col('createdAt'), '%d/%m/%Y'), 'data']
        ]
        }).then(pre => {  // o resultado será recebido na variável "pre"
            res.render("index", {
            lista_perguntas: pre
        })
    })
    
})

app.get("/perguntar", function(req, res){
    res.render("perguntar")
})

// recebe infos de um formulário post
app.post("/salvarpergunta", (req, res) => {

    var titulo = req.body.titulo
    var descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => { 
        res.redirect("/")
    })
})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id
    pergunta_model.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            res.render('pergunta', {
                perg: pergunta
            })
        }else{
            res.send("Pergunta não encontrada!")
        } 
    })
})

app.listen(8080, () => {
    console.log("APP RODANDO")
})