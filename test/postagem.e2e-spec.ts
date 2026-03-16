import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('Testes do Módulo Postagem (e2e)', () => {
  
  let token: any;
  let usuarioId: any;
  let temaId: any;
  let postagemId: any;
  
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:', // vai guardar a tabela gerada em memória apenas durante a execução do teste
        entities: [__dirname + './../src/**/entities/*.entity.ts'],
        synchronize: true,
        dropSchema: true, // apaga as tabelas
      }),AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    
    await app.init();
  
  });
  
  afterAll(async () => {
    await app.close();
  })

// ======================================================================================================
// AUTENTICAÇÃO

  it('01 - Deve Cadastrar um novo usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha:'rootroot',
        foto: '-'
      })
    .expect(201)
    usuarioId = resposta.body.id;
  })  

  it('02 - Deve autenticar um usuário (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario:'root@root.com',
        senha:'rootroot'
      })
    .expect(200)
     token = resposta.body.token;
  })

// ======================================================================================================
// Criação de TEMA

it('03 - Deve cadastrar um novo tema', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/temas/cadastrar')
      .set('Authorization',`${token}`)
      .send({
        descricao:'Tema Teste_01'
      })
    .expect(201)
    temaId = resposta.body.id;
    })
// ======================================================================================================
// TESTES DE POSTAGEM

  it('04 - Deve Cadastrar uma nova postagem', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/postagens/cadastrar')
      .set('Authorization',`${token}`)
      .send({
        titulo:'Postagem Teste_01',
        texto:'Lorem ipsum dolor sit amet.',
        data: new Date(),
        tema: {id: temaId},
        usuario: {id: usuarioId}
      })
      .expect(201)
      postagemId = resposta.body.id
  });

  it('05 - Deve listar todos as postagens', async () => {
    return await request(app.getHttpServer())
      .get('/postagens')
      .set('Authorization',`${token}`)
    .expect(200)
  });

  it('06 - Deve atualizar uma postagem', async () => {
    return await request(app.getHttpServer())
      .put('/postagens/atualizar')
      .set('Authorization',`${token}`)
      .send({
        id: postagemId,
        titulo:'Postagem Teste_01 ATUALIZADO',
        texto:'Lorem ipsum dolor sit amet.',
        data: new Date(),
        tema: {id: temaId},
        usuario: {id: usuarioId}
      })
    .expect(200)
    .then(resposta => {
      expect('Postagem Teste_01 ATUALIZADO').toEqual(resposta.body.titulo);
    })
  })

  it('07 - Deve buscar a postagem por id', async () => {
    return await request(app.getHttpServer())
      .get(`/postagens/${postagemId}`)
      .set('Authorization',`${token}`)
    .expect(200)
  });

  it('08 - Deve buscar a postagem por título', async () => {
    return await request(app.getHttpServer())
      .get(`/postagens/titulo/`+'post')
      .set('Authorization',`${token}`)
    .expect(200)
  });

  it('09 - Deve Deletar uma postagem', async () => {
      return await request(app.getHttpServer())
        .delete(`/postagens/${postagemId}`)
        .set('Authorization',`${token}`)
      .expect(204)
    });




})