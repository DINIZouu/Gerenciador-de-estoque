// Criando BD com nome estoque e criando a tabela produtos

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

//criando a função para conectar ao banco de dados
async function conectarBanco() {
  const db = await open({
    filename: './estoque.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      categoria TEXT DEFAULT 'Geral',
      quantidade INTEGER NOT NULL DEFAULT 0,
      quantidade_minima INTEGER DEFAULT 5,
      preco REAL NOT NULL,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

module.exports = conectarBanco;