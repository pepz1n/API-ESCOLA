const db = require("../config/db");

const getAll = async () => {
    let sql = 'select * from disciplinas';
    let disciplinas = await db.query(sql);
    return disciplinas.rows;
}

const getById = async (params) => {
    let sql = `select * from disciplinas where id = $1`;
    let cliente = await db.query(sql, [params.id]);
    return cliente.rows;
}

const persistir = async (params) => {
    if (!params.id) {
      let sql = `insert into disciplinas (descricao, id_professor)
        values ($1, $2) returning id;`
      const { descricao, id_professor } = params;
      const query = await db.query(sql, [descricao, id_professor]);
  
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
    const sql = `update disciplinas set ${fields} where id = ${params.id}`;
  
    const response = await db.query(sql);
    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`;
  
    return { type: 'info', msg }
}

const excluir = async (params) => {
    let sql = 'delete from disciplinas where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
}

module.exports.getAllDisciplina = getAll;
module.exports.getDisciplinaById = getById;
module.exports.persistirDisciplina = persistir;
module.exports.excluirDisciplina = excluir;