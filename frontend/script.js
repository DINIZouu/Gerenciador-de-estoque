const API_URL = 'http://localhost:3000/produtos';
let produtoEmEdicaoId = null;

// Elementos do DOM
const formProduto = document.getElementById('form-produto');
const tabelaProdutos = document.getElementById('tabela-produtos');
const campoBusca = document.getElementById('busca');
const btnSubmit = formProduto.querySelector('button[type="submit"]');
const btnCancelar = document.getElementById('btn-cancelar');

// Função para carregar e exibir os produtos
async function carregarProdutos() {
  try {
    const resposta = await fetch(API_URL);
    const resultado = await resposta.json();
    
    tabelaProdutos.innerHTML = '';
    let totalQuantidade = 0;
    let valorTotal = 0;

    resultado.dados.forEach(produto => {
      totalQuantidade += produto.quantidade;
      valorTotal += produto.quantidade * produto.preco;

      const linha = document.createElement('tr');
      
      // Destaca em vermelho fraco se o estoque estiver baixo
      if (produto.quantidade <= (produto.quantidade_minima || 5)) {
        linha.style.backgroundColor = '#ffe6e6';
      }

      linha.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>${produto.categoria || 'Geral'}</td>
        <td>${produto.quantidade}</td>
        <td>R$ ${Number(produto.preco).toFixed(2)}</td>
        <td>
          <button style="background: #ffc107; color: #000;" onclick="prepararEdicao(${JSON.stringify(produto).replace(/"/g, '&quot;')})">Editar</button>
          <button class="btn-delete" onclick="deletarProduto(${produto.id})">Excluir</button>
        </td>
      `;
      tabelaProdutos.appendChild(linha);
    });

    // Atualiza os cards de resumo
    document.getElementById('total-itens').innerText = totalQuantidade;
    document.getElementById('valor-total').innerText = `R$ ${valorTotal.toFixed(2)}`;

  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
  }
}

// Preenche o formulário para edição
function prepararEdicao(produto) {
  produtoEmEdicaoId = produto.id;
  document.getElementById('nome').value = produto.nome;
  document.getElementById('descricao').value = produto.descricao || '';
  document.getElementById('categoria').value = produto.categoria || '';
  document.getElementById('quantidade').value = produto.quantidade;
  document.getElementById('preco').value = produto.preco;

  btnSubmit.innerText = 'Atualizar Produto';
  btnSubmit.style.background = '#ffc107';
  btnSubmit.style.color = '#000';
  
  if (btnCancelar) btnCancelar.style.display = 'inline-block';
}

// Reseta o formulário para o estado inicial
function resetaFormulario() {
  produtoEmEdicaoId = null;
  formProduto.reset();
  
  btnSubmit.innerText = 'Adicionar Produto';
  btnSubmit.style.background = '#28a745';
  btnSubmit.style.color = '#fff';
  
  if (btnCancelar) btnCancelar.style.display = 'none';
}

// Evento de submit do formulário (Cadastrar / Atualizar)
formProduto.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dadosProduto = {
    nome: document.getElementById('nome').value,
    descricao: document.getElementById('descricao').value,
    categoria: document.getElementById('categoria').value,
    quantidade: parseInt(document.getElementById('quantidade').value),
    quantidade_minima: 5,
    preco: parseFloat(document.getElementById('preco').value)
  };

  try {
    if (produtoEmEdicaoId) {
      // Atualização (PUT)
      await fetch(`${API_URL}/${produtoEmEdicaoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosProduto)
      });
    } else {
      // Cadastro (POST)
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosProduto)
      });
    }

    resetaFormulario();
    carregarProdutos();
  } catch (erro) {
    console.error('Erro ao salvar produto:', erro);
  }
});

// Evento de cancelar edição
if (btnCancelar) {
  btnCancelar.addEventListener('click', resetaFormulario);
}

// Filtro de busca em tempo real
if (campoBusca) {
  campoBusca.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const linhas = tabelaProdutos.querySelectorAll('tr');

    linhas.forEach(linha => {
      const nome = linha.children[1].textContent.toLowerCase();
      const categoria = linha.children[2].textContent.toLowerCase();
      
      if (nome.includes(termo) || categoria.includes(termo)) {
        linha.style.display = '';
      } else {
        linha.style.display = 'none';
      }
    });
  });
}

// Função para deletar produto
async function deletarProduto(id) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      carregarProdutos();
    } catch (erro) {
      console.error('Erro ao deletar produto:', erro);
    }
  }
}

// Carrega os dados ao abrir a página
carregarProdutos();