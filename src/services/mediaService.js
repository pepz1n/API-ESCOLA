const db = require("../config/db")


const media = async(params) =>{
    const {matricula_aluno, id_disciplina, data_inicio, data_fim} = params
    let {id,id_pessoa} = await pegarIdAlunoFromMatricula(matricula_aluno)
    let nomeAluno = await pegarNomeAluno(id_pessoa)
    let sql = `select nota, peso from notas where id_aluno = $1 and id_disciplina = $2 and datahora between $3 and $4`
    let resultado = await db.query(sql,[id, id_disciplina, data_inicio, data_fim])
    
    console.log(resultado.rows[0]);
    
    
    let totalNotas = 0;
    let totalPesos = 0;
    
    resultado.rows.forEach(bagulho =>{
        totalNotas +=  (Number(bagulho.nota)*Number(bagulho.peso))
        totalPesos += (Number(bagulho.peso))
    })
    let notaFinal = totalNotas/totalPesos;
    
    let passou = ""
    
    if(notaFinal>= 4 ){
        if(notaFinal<6){
            passou =`${nomeAluno} Dependencia`
        }else{
            passou = `${nomeAluno} Passou`
        }
    }else{
       passou = `${nomeAluno} reprovou` 
    }

    return {
        nomeAluno,
        matricula_aluno: matricula_aluno,
        Media: notaFinal.toFixed(2),
        passou: passou
    }
   
}




const pegarIdAlunoFromMatricula = async(matricula) =>{
    let sql = `select id, id_pessoa from alunos where matricula = $1`
    let resultado = await db.query(sql, [matricula])
    console.log(resultado.rows[0]);
    return resultado.rows[0]

}



const pegarNomeAluno = async (idPessoa) => {
    let sql = 'select nome from pessoas where id = $1'
    let resultado = await db.query(sql, [idPessoa])
    console.log(resultado.rows[0].nome);
    return resultado.rows[0].nome
}



module.exports.media = media