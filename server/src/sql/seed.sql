-- Dados fictícios para desenvolvimento.
-- Rodar mais de uma vez é seguro: esvazia antes de inserir.

TRUNCATE users, sessions, customers, invoices RESTART IDENTITY;

-- Usuários. Só o primeiro é admin; os demais são donos dos clientes.
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Usuário Administrador', 'admin@financial-manager.example.com',   'placeholder', 'admin'),
  ('Ana Bessa',             'ana@financial-manager.example.com',     'placeholder', 'user'),
  ('Carlos Daniel',         'carlos@financial-manager.example.com',  'placeholder', 'user'),
  ('Eder Fagundes',         'eder@financial-manager.example.com',    'placeholder', 'user'),
  ('Gustavo Hebe',          'gustavo@financial-manager.example.com', 'placeholder', 'user');

-- 24 clientes: 8 de Ana (id 2), 7 de Carlos (3), 6 de Eder (4), 3 de Gustavo (5).
INSERT INTO customers (user_id, name, email) VALUES
  (2, 'Alvorada Engenharia',   'contato@alvoradaengenharia.example.com'),
  (2, 'Bandeirante Logística', 'contato@bandeirantelogistica.example.com'),
  (2, 'Construtora Meridiano', 'contato@meridiano.example.com'),
  (2, 'Delta Mineração',       'contato@deltamineracao.example.com'),
  (2, 'Estação Alimentos',     'contato@estacaoalimentos.example.com'),
  (2, 'Fonte Clara',           'contato@fonteclara.example.com'),
  (2, 'Gráfica Aurora',        'contato@graficaaurora.example.com'),
  (2, 'Horizonte Seguros',     'contato@horizonteseguros.example.com'),
  (3, 'Ilha Verde',            'contato@ilhaverde.example.com'),
  (3, 'Jacarandá Móveis',      'contato@jacarandamoveis.example.com'),
  (3, 'Lumina Energia',        'contato@luminaenergia.example.com'),
  (3, 'Montanha Transportes',  'contato@montanhatransportes.example.com'),
  (3, 'Norte Têxtil',          'contato@nortetextil.example.com'),
  (3, 'Oficina Paulista',      'contato@oficinapaulista.example.com'),
  (3, 'Pedra Alta',            'contato@pedraalta.example.com'),
  (4, 'Quadrante Arquitetura', 'contato@quadrantearquitetura.example.com'),
  (4, 'Raiz Agropecuária',     'contato@raizagropecuaria.example.com'),
  (4, 'Sertão Cerâmica',       'contato@sertaoceramica.example.com'),
  (4, 'Tramontana Metais',     'contato@tramontanametais.example.com'),
  (4, 'União Farmacêutica',    'contato@uniaofarmaceutica.example.com'),
  (4, 'Vale Fértil',           'contato@valefertil.example.com'),
  (5, 'Xavante Papelaria',     'contato@xavantepapelaria.example.com'),
  (5, 'Zênite Consultoria',    'contato@zeniteconsultoria.example.com'),
  (5, 'Âncora Naval',          'contato@ancoranaval.example.com');

-- 72 faturas PAGAS (3 por cliente), emitidas ao longo do último ano.
INSERT INTO invoices (customer_id, amount, status, issue_date, due_date, created_at)
SELECT
  1 + (n - 1) % 24,
  5000 + (n * 97391) % 7995000,
  'paid',
  CURRENT_DATE - n * 5,
  CURRENT_DATE - n * 5 + 15 + n % 46,
  CURRENT_DATE - n * 5 + n % 5
FROM generate_series(1, 72) AS n;

-- 48 faturas PENDENTES com vencimento futuro (2 por cliente).
INSERT INTO invoices (customer_id, amount, status, issue_date, due_date, created_at)
SELECT
  1 + (n - 1) % 24,
  5000 + (n * 61843) % 7995000,
  'pending',
  CURRENT_DATE - n % 10,
  CURRENT_DATE + 5 + n % 50,
  CURRENT_DATE - n % 10
FROM generate_series(1, 48) AS n;

-- 24 faturas PENDENTES já VENCIDAS → aparecem como "Atrasada" na UI (1 por cliente).
INSERT INTO invoices (customer_id, amount, status, issue_date, due_date, created_at)
SELECT
  1 + (n - 1) % 24,
  5000 + (n * 34567) % 7995000,
  'pending',
  CURRENT_DATE - 60 - n * 3,
  CURRENT_DATE - 30 - n * 3,
  CURRENT_DATE - 60 - n * 3 + n % 4
FROM generate_series(1, 24) AS n;