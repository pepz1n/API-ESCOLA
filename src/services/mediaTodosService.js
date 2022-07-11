const db = require ("../config/db")

const media = async(params) =>{
    const {id_disciplina, data_inicio, data_fim} = params
    let sql = `select
                    a.id as id_aluno,
                    i.notas
                from alunos as a
                inner join (
                    select
                        n.id_aluno,
                        array_agg(jsonb_build_object(
                            'nota', n.nota,
                            'peso', n.peso
                        )) as notas
                    from notas as n
                    where datahora between $1 and $2 and n.id_disciplina = $3
                    group by n.id_aluno
                ) as i on (a.id = i.id_aluno)`
    let notas = await db.query(sql, [data_inicio, data_fim, id_disciplina])
    let forget = await calcularMedia(notas.rows)
    let nomeDisciplina = await pegarNomeMateria(id_disciplina)
    forget.unshift({
        nomeDisciplina
    })
    return forget
    
}

const passou =  async (nota) =>{
    let passou = ""
    
    if(nota>= 4 ){
        if(nota<6){
            passou =`Dependencia`
        }else{
            passou = `Passou`
        }
    }else{
       passou = `reprovou` 
    }
    return passou
}




const calcularMedia = async (vetorNotas) =>{
    let medias = []
        
    vetorNotas.forEach(async aluno => {
        
        let totalNotas = 0;
        let totalPesos = 0;
        
        
        
        let id_aluno1 = aluno.id_aluno
        let nomeAluno = await pegarNomeAluno(aluno.id_aluno)
        
        
        
        aluno.notas.forEach(async nota => {
            
            totalNotas += (Number(nota.nota)*Number(nota.peso))
            totalPesos += (Number(nota.peso))
        })  
        let mediaFinal = totalNotas/totalPesos
        let passo = await passou(mediaFinal)
        
        medias.push({
            id_aluno: id_aluno1,
            nomeAluno,
            mediaFinal,
            situacao: passo
        })     
    });
    return medias
}


const pegarNomeMateria = async(idMateria) =>{
    let sql2 = `select descricao from disciplinas where id = $1`
    let disciplina =  await db.query(sql2,[idMateria])
    return disciplina.rows[0].descricao
}


const pegarNomeAluno = async(id_aluno) =>{
    let sql3 = `select id_pessoa from alunos where id = $1`
    let id_pessoa = await db.query(sql3,[id_aluno])
    let sql4 = `select nome from pessoas where id = $1`
    let nomePessoa = await db.query (sql4, [id_pessoa.rows[0].id_pessoa])
    return nomePessoa.rows[0].nome
    

}



module.exports.media = media