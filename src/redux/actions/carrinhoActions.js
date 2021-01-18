export const carrinhoProdutoAdd = values => ({
    type: CARRINHO_PRODUTO_ADD,
    produto: values.produto
});

export const carrinhoProdutoSub = values => ({
    type: CARRINHO_PRODUTO_SUB,
    produto: values.produto
})