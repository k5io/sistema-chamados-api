const pool = require('../config/database');

const ChamadoModel = {
  async listarTodos() {
    const resultado = await pool.query('SELECT * FROM chamados ORDER BY id ASC');
    return resultado.rows;
  },

  async criar(dados) {
    const { solicitante, categoria, descricao, prioridade } = dados;
    const query = `
      INSERT INTO chamados (solicitante, categoria, descricao, prioridade) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const valores = [solicitante, categoria || 'Geral', descricao, prioridade || 'Média'];
    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  },

  async atualizar(id, dados) {
    const { status, responsavel, observacoes } = dados;
    const query = `
      UPDATE chamados 
      SET status = COALESCE($1, status), 
          responsavel = COALESCE($2, responsavel), 
          observacoes = COALESCE($3, observacoes) 
      WHERE id = $4 
      RETURNING *;
    `;
    const valores = [status, responsavel, observacoes, id];
    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  },

  async deletar(id) {
    const resultado = await pool.query('DELETE FROM chamados WHERE id = $1 RETURNING *;', [id]);
    return resultado.rowCount > 0;
  }
};

module.exports = ChamadoModel;