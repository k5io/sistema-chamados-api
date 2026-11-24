const pool = require('../config/database');

const ChamadoModel = {
  async listarTodos() {
    const resultado = await pool.query('SELECT * FROM chamados ORDER BY id DESC');
    return resultado.rows;
  },

  async criar(dados) {
    const { solicitante, categoria, descricao, prioridade, responsavel, observacoes } = dados;
    const query = `
      INSERT INTO chamados (solicitante, categoria, descricao, prioridade, responsavel, observacoes) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `;
    const valores = [
      solicitante,
      categoria || 'Geral',
      descricao,
      prioridade || 'Média',
      responsavel || 'Não atribuído',
      observacoes || ''
    ];
    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  },

  async atualizar(id, dados) {
    const { status, prioridade, responsavel, observacoes } = dados;
    const query = `
      UPDATE chamados 
      SET status = COALESCE($1, status), 
          prioridade = COALESCE($2, prioridade),
          responsavel = COALESCE($3, responsavel), 
          observacoes = COALESCE($4, observacoes) 
      WHERE id = $5 
      RETURNING *;
    `;
    const valores = [status, prioridade, responsavel, observacoes, id];
    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  },

  async deletar(id) {
    const resultado = await pool.query('DELETE FROM chamados WHERE id = $1 RETURNING *;', [id]);
    return resultado.rowCount > 0;
  }
};

module.exports = ChamadoModel;
