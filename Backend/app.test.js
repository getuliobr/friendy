const app = require('./app');
const request = require('supertest');
const Usuario = require('./src/models/usuario.model');

describe('Teste da API', () => {
  test('Deve retornar status code 200', async () => {
    await request(app).get('/').expect(200);
  });
});

describe('Testes cadastro usuário', () => {
  beforeAll(async () => {
    await Usuario.destroy({ where: {} });
  });

  test('Deve criar e retornar um usuario', async () => {
    await request(app)
      .post('/usuario/cadastrar')
      .send({
        nome: 'friendy',
        senha: '123456',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        const { body } = res;
        const { usuario } = body;
        expect(usuario.nome).toBe('friendy');
        expect(body.token).toBeDefined();
      });
  });

  test('Não deve criar um usuario com mesmo nome', async () => {
    await request(app)
      .post('/usuario/cadastrar')
      .send({
        nome: 'friendy',
        senha: '123456',
      })
      .expect(403);
  });

  test('Não deve criar uma conta sem senha', async () => {
    await request(app)
      .post('/usuario/cadastrar')
      .send({
        nome: 'semsenha',
      })
      .expect(500);
  });

  test('Não deve criar uma conta sem nome', async () => {
    await request(app)
      .post('/usuario/cadastrar')
      .send({
        senha: '123456',
      })
      .expect(500);
  });
});

describe('Testes login usuário', () => {
  let usuarioCriado;
  beforeAll(async () => {
    await Usuario.destroy({ where: {} });
    usuarioCriado = await Usuario.create({
      nome: 'friendy',
      senha: '123456',
    });
  });

  test('Deve ser possivel logar em um usuário com a senha e nome correto', async () => {
    await request(app)
      .post('/usuario/login')
      .send({
        nome: 'friendy',
        senha: '123456',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        const { body } = res;
        const { usuario } = body;
        expect(usuario.nome).toBe(usuarioCriado.nome);
        expect(usuario.id).toBe(usuarioCriado.id);
        expect(body.token).toBeDefined();
      });
  });

  test('Não deve ser possivel logar em um usuário com a senha incorreta', async () => {
    await request(app)
      .post('/usuario/login')
      .send({
        nome: 'friendy',
        senha: '1234567',
      })
      .expect(401);
  });

  test('Não deve ser possivel logar em um usuário não cadastrado', async () => {
    await request(app)
      .post('/usuario/login')
      .send({
        nome: 'friendi',
        senha: '123456',
      })
      .expect(401);
  });
});

describe('Testes listar usuários', () => {
  let usuariosCriados = [];
  let authorization;

  beforeAll(async () => {
    await Usuario.destroy({ where: {} });
    const promises = [];
    for(let i = 0; i < 10; i++) {
      promises.push(
        Usuario.create({
          nome: `friendy${i}`,
          senha: '123456',
        })
      );
    };
    usuariosCriados = await Promise.all(promises);

    await request(app)
      .post('/usuario/login')
      .send({
        nome: 'friendy1',
        senha: '123456',
      })
      .then((res) => {
        authorization = res.body.token;
      });

  });

  test('Não deve listar usuários sem estar logado', async () => {
    await request(app)
      .get('/usuario')
      .expect(401)
  });

  test('Não deve ser possivel buscar os dados de um usuário pelo o ID sem estar logado', async () => {
    const promises = [];
    for(const usuarioDB of usuariosCriados) {
      promises.push(
        request(app)
          .get(`/usuario/${usuarioDB.id}`)
          .expect(401)
      );
    };
    await Promise.all(promises);
  });

  test('Deve retornar todos os usuários cadastrados', async () => {
    await request(app)
      .get('/usuario')
      .set('Authorization', authorization)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        const { body: usuarios } = res;
        expect(usuarios.length).toBe(10);
        for(const usuario of usuarios) {
          expect(usuariosCriados.map(u => u.id)).toContain(usuario.id);
          expect(usuario.senha).toBe(undefined);
        }
      });
  });

  test('Deve ser possivel buscar os dados de um usuário pelo o ID', async () => {
    const promises = [];
    for(const usuarioDB of usuariosCriados) {
      promises.push(
        request(app)
          .get(`/usuario/${usuarioDB.id}`)
          .set('Authorization', authorization)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            const { body: usuario } = res;
            expect(usuario.id).toBe(usuarioDB.id);
            expect(usuario.nome).toBe(usuarioDB.nome);
            expect(usuario.senha).toBe(undefined);
          })
      );
    };
    await Promise.all(promises);
  });
});

describe('Testes das mensagens', () => {
  test('Não deve criar uma conversa sem destinatario', async () => {
    await request(app)
      .post('/conversa/criar')
      .send({
        remetente: 'a69sd49f84as98d4f98a4sd9fas',
      })
      .expect(500);
  });

  test('Não deve criar uma conversa sem remetente', async () => {
    await request(app)
      .post('/conversa/criar')
      .send({
        destinatario: 'a9s8d4f98as4d98f4sa',
      })
      .expect(500);
  });

  test('Não se deve pegar uma conversa de um id que não existe', async () => {
    await request(app)
      .get('/conversa/id')
      .send({
        id: 'df89g49df84g98df4gd',
      })
      .expect(404);
  });

  test('Não deve criar uma mensagem sem o id de sua conversa', async () => {
    await request(app)
      .post('/mensagem/enviar')
      .send({
        remetenteId: 'a9s8d4f98as4d98f4sa',
        remetenteNome: 'Cleiton',
        text: "Teste teste",
      })
      .expect(500);
  });

  test('Não deve criar uma mensagem sem o id do remetente', async () => {
    await request(app)
      .post('/mensagem/enviar')
      .send({
        conversaId: 'a9s8d4f98as4d98f4sa',
        remetenteNome: 'Cleiton',
        text: "Teste teste",
      })
      .expect(500);
  });

  test('Não deve criar uma mensagem sem o nome do remetente', async () => {
    await request(app)
      .post('/mensagem/enviar')
      .send({
        conversaId: 'a9s8d4f98as4d98f4sa',
        remetenteId: 'a9s8d4f98as4d98f4sa',
        text: "Teste teste",
      })
      .expect(500);
  });

  test('Não deve criar uma mensagem sem o texto', async () => {
    await request(app)
      .post('/mensagem/enviar')
      .send({
        conversaId: 'a9s8d4f98as4d98f4sa',
        remetenteId: 'a9s8d4f98as4d98f4sa',
        remetenteNome: 'Cleiton',
      })
      .expect(500);
  });

  test('Não deve ser possivel pegar mensagens de uma id de uma conversa que não existe', async () => {
    await request(app)
      .get('/mensagem/enviar')
      .send({
        id: 'a9a8sd489f49a8sd48f9as498fa'
      })
      .expect(404);
  });
});

describe('Teste seguidor', () => {
  let usuariosCriados = [];
  let authorization;

  beforeAll(async () => {
    await Usuario.destroy({ where: {} });
    const promises = [];
    for(let i = 0; i < 2; i++) {
      promises.push(
        Usuario.create({
          nome: `friendy${i}`,
          senha: '123456',
        })
      );
    };
    usuariosCriados = await Promise.all(promises);

    await request(app)
      .post('/usuario/login')
      .send({
        nome: usuariosCriados[0].nome,
        senha: '123456',
      })
      .then((res) => {
        authorization = res.body.token;
      });
  });

  test('Não deve ser possivel seguir um usuário que não existe', async () => {
    await request(app)
      .post('/seguir')
      .set('Authorization', authorization)
      .send({
        id: 'a9s8d4f98as4d98f4sa',
      })
      .expect(404);
  });

  test('Não deve ser possivel se seguir', async () => {
    await request(app)
      .post('/seguir')
      .set('Authorization', authorization)
      .send({
        id: usuariosCriados[0].id,
      })
      .expect(400);
  });

  test('Deve ser possivel seguir um usuario que não é si mesmo', async () => {
    await request(app)
      .post('/seguir')
      .set('Authorization', authorization)
      .send({
        id: usuariosCriados[1].id,
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        const { message } = res.body;
        expect(message).toBe(`Agora você segue ${usuariosCriados[1].nome}`);
      });
  });

  test('Deve ser possivel parar de seguir um usuario', async () => {
    await request(app)
      .post('/seguir')
      .set('Authorization', authorization)
      .send({
        id: usuariosCriados[1].id,
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        const { message } = res.body;
        expect(message).toBe(`Você parou de seguir ${usuariosCriados[1].nome} com sucesso`);
      });
  });
});

describe('Teste de atualizar usuário', () => {
  let usuarioCriado;
  let authorization;

  beforeAll(async () => {
    await Usuario.destroy({ where: {} });
    usuarioCriado = await Usuario.create({
      nome: 'friendy',
      senha: '123456',
    });

    await request(app)
      .post('/usuario/login')
      .send({
        nome: 'friendy',
        senha: '123456',
      })
      .then((res) => {
        authorization = res.body.token;
      });
  });

  test('Deve ser possivel atualizar os campos instagram, facebook e descricao do usuario', async () => {

    const dadosParaAtualizar = {
      instagram: '@friendy',
      facebook: 'friendyfacebook',
      descricao: 'friendy descricao',
    };

    await request(app)
      .patch('/usuario/atualizar')
      .set('Authorization', authorization)
      .send(dadosParaAtualizar)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        const { instagram, facebook, descricao } = res.body;
        expect(instagram).toBe(dadosParaAtualizar.instagram);
        expect(facebook).toBe(dadosParaAtualizar.facebook);
        expect(descricao).toBe(dadosParaAtualizar.descricao);
      });
  });
});