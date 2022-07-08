const db = require("../config/db");

const getAll = async () => {
    let sql = 'select * from professores';
    let professor = await db.query(sql);
    return professor.rows;
}

const getById = async (params) => {
    let sql = `select * from professores where id = $1`;
    let cliente = await db.query(sql, [params.id]);
    return cliente.rows;
}

const persistir = async (params) => {
    if (!params.id) {
      let sql = `insert into professores (matricula, id_pessoa)
        values ($1, $2) returning id;`
      const { matricula, id_pessoa } = params;
      const query = await db.query(sql, [matricula, id_pessoa]);
  
      return { type: 'info', msg: 'Registro incluído com sucesso!', data: { id: query.rows[0].id } };
    }
  
    let fields = [];
  
    Object.keys(params).forEach(e => {
      if (e !== 'id') {
        if (params[e] === '' || params[e] == null) {
          fields.push(`${e} = null`)
        } else {
          fields.push(`${e} = '${params[e]}'`)
        }
      }
    });
    fields = fields.join(', ');
    const sql = `update professores set ${fields} where id = ${params.id}`;
  
    const response = await db.query(sql);
    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`;
  
    return { type: 'info', msg }
}

const excluir = async (params) => {
    let sql = 'delete from professores where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
}

module.exports.getAllProfessor = getAll;
module.exports.getProfessorById = getById;
module.exports.persistirProfessor = persistir;
module.exports.excluirProfessor = excluir;