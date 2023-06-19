import express, {Request,Response} from 'express';
import mysql2 from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

///////////////////////////////////////////////////////////////////////// PESSOAS /////////////////////////////////////////////////////////////////////////////////////////////////////
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
    let query = "INSERT INTO pessoas (cpf,nome,email,telefone) VALUES (?,?,?,?)";
    let [resultado, _ ] = await banco.query(query,[req.body.cpf,req.body.nome,req.body.email,req.body.telefone]);
    res.send({mensagem:"Cadastrado"});
});
app.delete('/pessoas/:cpf',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let query = "DELETE FROM pessoas WHERE cpf = ?";
    let [resultado, _ ] = await banco.query(query,[req.params.cpf]);
    res.send({mensagem:"Excluido"});
});

app.put('/pessoas/:cpf',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let sql = "UPDATE pessoas SET cpf = ?, nome = ?, email= ?, telefone= ? WHERE cpf = ?"
    let [resultado, _ ] 
        = await banco.query(sql,[req.body.cpf,req.body.nome,req.body.email,req.body.telefone,req.params.cpf]);
    banco.end()
    res.send(JSON.stringify({mensagem:"Atualizado com sucesso"})).status(200);
})

//////////////////////////////////////////////////////////////////////////////// ITENS ///////////////////////////////////////////////////////////////////////////////////////

app.get('/itens',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let query = "SELECT * FROM itens";
    let [resultado, _ ] = await banco.query(query);
    res.send(resultado);
});
app.post('/itens',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let query = "INSERT INTO itens (id,nome) VALUES (?,?)";
    let [resultado, _ ] = await banco.query(query,[req.body.id,req.body.nome]);
    res.send({mensagem:"Cadastrado"});
});

app.delete('/itens/:id',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let query = "DELETE FROM itens WHERE id = ?";
    let [resultado, _ ] = await banco.query(query,[req.params.id]);
    res.send({mensagem:"Cadastrado"});
});

app.put('/itens/:id',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let sql = "UPDATE itens SET id = ?, nome = ? WHERE id = ?"
    let [resultado, _ ] = await banco.query(sql,[req.body.id,req.body.nome,req.params.id]);
    banco.end()
    res.send(JSON.stringify({mensagem:"Atualizado com sucesso"})).status(200);
});

//////////////////////////////////////////////////////////////////////// IMPRESTIMO /////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/emprestimo',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let query = "SELECT * FROM emprestimo";
    let [resultado, _ ] = await banco.query(query);
    res.send(resultado);
});
app.post('/emprestimo',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    //console.log([req.body.id2,req.body.itens_id,req.body.nomeI,req.body.nomeP,req.body.cpf,req.body.data])
    let query = "INSERT INTO emprestimo (itens_id,nomeI,nomeP,pessoas_cpf,dataE) VALUES (?,?,?,?,?)";
    let [resultado, _ ] = await banco.query(query,[req.body.itens_id,req.body.nomeI,req.body.nomeP,req.body.cpf,req.body.data]);
    res.send({mensagem:"Cadastrado"});
});

app.delete('/emprestimo/:id2',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let query = "DELETE FROM emprestimo WHERE id2 = ?";
    let [resultado, _ ] = await banco.query(query,[req.params.id2]);
    res.send({mensagem:"Cadastrado"});
});

app.put('/emprestimo/:id2',async (req:Request,res:Response)=>{
    let banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    })
    let sql = "UPDATE emprestimo SET itens_id = ?, nomeI = ?, nomeP = ?, cpf = ?, data = ? WHERE id2 = ?"
    let [resultado, _ ] = await banco.query(sql,[req.body.itens_id,req.body.nomeI,req.body.nomeP,req.body.cpf,req.body.data,req.params.id2]);
    banco.end()
    res.send(JSON.stringify({mensagem:"Atualizado com sucesso"})).status(200);
});

app.get('/tere', (req:Request, res:Response) => {
    res.send('Hello Tere!');
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})

