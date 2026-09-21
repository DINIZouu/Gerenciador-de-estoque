const express = require('express');
const cors = require('cors');
const conectarBanco = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let db;

// Inicializa o banco de dados antes de escutar as requisições
conectarBanco().then((instanciaDb) => {
  db = instanciaDb;
  console.log('Banco de dados SQLite conectado!');

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar no banco de dados:', err);
});

// Rota para listar produtos (READ)
app.get('/produtos', async (req, res) => {
  try {
    const produtos = await db.all('SELECT * FROM produtos');
    res.json({ dados: produtos });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para cadastrar produto (CREATE)
app.post('/produtos', async (req, res) => {
  const { nome, descricao, categoria, quantidade, quantidade_minima, preco } = req.body;

  if (!nome || quantidade === undefined || preco === undefined) {
    return res.status(400).json({ erro: 'Informe nome, quantidade e preço.' });
  }

  try {
    const sql = `
      INSERT INTO produtos (nome, descricao, categoria, quantidade, quantidade_minima, preco)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const resultado = await db.run(sql, [
      nome,
      descricao || '',
      categoria || 'Geral',
      quantidade,
      quantidade_minima || 5,
      preco
    ]);

    res.status(201).json({
      mensagem: 'Produto cadastrado com sucesso!',
      id: resultado.lastID
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para atualizar produto (UPDATE)
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria, quantidade, quantidade_minima, preco } = req.body;

  try {
    const sql = `
      UPDATE produtos 
      SET nome = ?, descricao = ?, categoria = ?, quantidade = ?, quantidade_minima = ?, preco = ?, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const resultado = await db.run(sql, [
      nome,
      descricao,
      categoria,
      quantidade,
      quantidade_minima,
      preco,
      id
    ]);

    if (resultado.changes === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    res.json({ mensagem: 'Produto atualizado com sucesso!', alteracoes: resultado.changes });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para deletar produto (DELETE)
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await db.run('DELETE FROM produtos WHERE id = ?', [id]);

    if (resultado.changes === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    res.json({ mensagem: 'Produto removido com sucesso!', alteracoes: resultado.changes });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});