const ChamadoModel = require('../models/chamadoModel');

// 1. Listar todos os chamados (GET)
const listarChamados = async (req, res) => {
  try {
    const chamados = await ChamadoModel.listarTodos();
    return res.json(chamados);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao listar chamados do banco de dados.' });
  }
};

// 2. Criar um novo chamado (POST)
const criarChamado = async (req, res) => {
  try {
    const { solicitante, categoria, descricao, prioridade } = req.body;

    if (!solicitante || !descricao) {
      return res.status(400).json({ erro: 'Os campos "solicitante" e "descricao" são obrigatórios.' });
    }

    const novoChamado = await ChamadoModel.criar({ solicitante, categoria, descricao, prioridade });

    return res.status(201).json({
      mensagem: 'Chamado aberto com sucesso!',
      chamado: novoChamado
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao criar chamado no banco de dados.' });
  }
};

// 3. Atualizar um chamado (PUT)
const atualizarChamado = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, responsavel, observacoes } = req.body;

    const chamadoAtualizado = await ChamadoModel.atualizar(id, { status, responsavel, observacoes });

    if (!chamadoAtualizado) {
      return res.status(404).json({ erro: 'Chamado não encontrado.' });
    }

    return res.json({
      mensagem: 'Chamado atualizado com sucesso!',
      chamado: chamadoAtualizado
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao atualizar chamado.' });
  }
};

// 4. Excluir um chamado (DELETE)
const deletarChamado = async (req, res) => {
  try {
    const { id } = req.params;
    const sucesso = await ChamadoModel.deletar(id);

    if (!sucesso) {
      return res.status(404).json({ erro: 'Chamado não encontrado.' });
    }

    return res.json({ mensagem: 'Chamado excluído com sucesso!' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao excluir chamado.' });
  }
};

module.exports = {
  listarChamados,
  criarChamado,
  atualizarChamado,
  deletarChamado
};