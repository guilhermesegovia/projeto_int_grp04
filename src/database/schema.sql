CREATE TABLE IF NOT EXISTS categoria (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome VARCHAR(100) NOT NULL CHECK(length(nome)>3),
descricao VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS cliente (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome VARCHAR(100) NOT NULL CHECK(length(nome)>3),
telefone VARCHAR(11) UNIQUE NOT NULL CHECK(length(telefone)>10),
cpf VARCHAR(11) UNIQUE NOT NULL CHECK(length(cpf)>10),
email VARCHAR(40) UNIQUE NOT NULL,
senha VARCHAR(30) NOT NULL CHECK(length(senha)>7),
data_nascimento DATE
);


CREATE TABLE IF NOT EXISTS endereco (
id INTEGER PRIMARY KEY AUTOINCREMENT,
rua VARCHAR(150) NOT NULL,
numero VARCHAR(10) NOT NULL,
bairro VARCHAR(100) NOT NULL,
cidade VARCHAR(100) NOT NULL,
estado VARCHAR(2) NOT NULL,
cep VARCHAR(8) NOT NULL CHECK(length(cep)=8),
complemento VARCHAR(100),
id_cliente INTEGER,
FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);


CREATE TABLE IF NOT EXISTS funcionario(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome VARCHAR(100) NOT NULL CHECK(length(nome)>3),
setor VARCHAR(100) NOT NULL,
cargo VARCHAR(100) NOT NULL CHECK(length(cargo)>4),
data_nascimento DATE,
cpf VARCHAR(11) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
senha VARCHAR(30) NOT NULL CHECK(length(senha)>7)
);


CREATE TABLE IF NOT EXISTS produto (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome_produto VARCHAR(100),
composicao VARCHAR(100),
indicacao VARCHAR(100),
beneficios VARCHAR(100),
advertencias VARCHAR(100),
modo_uso VARCHAR(100),
lote VARCHAR(100),
validade DATE,
descricao VARCHAR(500),
finalidade VARCHAR(500),
valor DECIMAL(10,2),
id_categoria INT,
FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);


CREATE TABLE IF NOT EXISTS carrinho (
id INTEGER PRIMARY KEY AUTOINCREMENT,
id_cliente INT NOT NULL,
id_produto INT NOT NULL,
quantidade INT NOT NULL CHECK(quantidade > 0),
FOREIGN KEY (id_cliente) REFERENCES cliente(id),
FOREIGN KEY (id_produto) REFERENCES produto(id),
UNIQUE(id_cliente, id_produto)
);


CREATE TABLE IF NOT EXISTS pedido (
id INTEGER PRIMARY KEY AUTOINCREMENT,
frete DECIMAL(10,2) NOT NULL,
cupom VARCHAR(25),
total DECIMAL(10,2) NOT NULL,
data_hora DATETIME,
id_cliente INTEGER,
id_endereco INTEGER,
FOREIGN KEY (id_cliente) REFERENCES cliente(id),
FOREIGN KEY (id_endereco) REFERENCES endereco(id)
);


CREATE TABLE IF NOT EXISTS item_pedido(
id INTEGER PRIMARY KEY AUTOINCREMENT,
id_produto INT,
id_pedido INT,
quantidade INT NOT NULL CHECK(quantidade > 0),
FOREIGN KEY (id_produto) REFERENCES produto(id),
FOREIGN KEY (id_pedido) REFERENCES pedido(id)
);


CREATE TABLE IF NOT EXISTS pagamento(
id INTEGER PRIMARY KEY AUTOINCREMENT,
metodo VARCHAR(20) NOT NULL,
status_pagamento VARCHAR(30) NOT NULL,
data_pagamento DATE,
status_entrega VARCHAR(40) NOT NULL,
valor DECIMAL(10,2) NOT NULL,
id_pedido INT,
FOREIGN KEY (id_pedido) REFERENCES pedido(id)
);


CREATE TABLE IF NOT EXISTS estoque(
id INTEGER PRIMARY KEY AUTOINCREMENT,
tipo VARCHAR(100) CHECK(length(tipo)>3),
quantidade INT CHECK(quantidade > 0),
data_entrada DATE NOT NULL,
data_validade DATE NOT NULL,
id_produto INT,
id_funcionario INT,
FOREIGN KEY (id_produto) REFERENCES produto(id),
FOREIGN KEY (id_funcionario) REFERENCES funcionario(id)
);


CREATE TABLE IF NOT EXISTS avaliacao (
id INTEGER PRIMARY KEY AUTOINCREMENT,
comentario VARCHAR(300),
estrelas DECIMAL(2,1),
id_produto INT,
FOREIGN KEY (id_produto) REFERENCES produto(id)
);


CREATE TABLE IF NOT EXISTS mensagem (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
mensagem TEXT NOT NULL,
data_hora DATETIME NOT NULL,
resposta TEXT,
data_resposta DATETIME,
id_cliente INTEGER,
FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);
