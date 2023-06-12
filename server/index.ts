import express, {Request,Response} from 'express';
import mysql2 from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/pessoas',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let query = "SELECT * FROM pessoas";
    let [resultado, _ ] = await banco.query(query);
    res.send(resultado);
});
app.post('/pessoas',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    //console.log(req.body.id,req.body.nome,req.body.idade)
    let query = "INSERT INTO pessoas (id,nome,idade) VALUES (?,?,?)";
    let [resultado, _ ] = await banco.query(query,[req.body.id,req.body.nome,req.body.idade]);
    res.send({mensagem:"Cadastrado"});
});

app.delete('/pessoas/:id',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    //console.log(req.body.id,req.body.nome,req.body.idade)
    let query = "DELETE FROM pessoas WHERE id = ?";
    let [resultado, _ ] = await banco.query(query,[req.params.id]);
    res.send({mensagem:"Cadastrado"});
});

app.put('/pessoas/:id',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    //console.log(req.body.id,req.body.nome,req.body.idade)
    let sql = "UPDATE pessoas SET id = ?, nome = ?, idade = ? WHERE id = ?"
    let [resultado, _ ] = await banco.query(sql,[req.body.id,req.body.nome,req.body.idade,req.params.id]);
    banco.end()
    res.send(JSON.stringify({mensagem:"Atualizado com sucesso"})).status(200);
});

app.get('/tere', (req:Request, res:Response) => {
    res.send('Hello Tere!');
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})

