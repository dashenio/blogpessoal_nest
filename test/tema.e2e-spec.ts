import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('Testes do Módulo Tema (e2e)', () => {
  
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
// TESTES DE TEMA
  
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

  it('04 - Deve listar todos os temas', async () => {
    return await request(app.getHttpServer())
      .get('/temas')
      .set('Authorization',`${token}`)
    .expect(200)
  });

  it('05 - Deve atualizar um tema', async () => {
    return await request(app.getHttpServer())
      .put('/temas/atualizar')
      .set('Authorization',`${token}`)
      .send({
        id: temaId,
        descricao:'Tema Teste_01 ATUALIZADO'
      })
    .expect(200)
    .then(resposta => {
      expect('Tema Teste_01 ATUALIZADO').toEqual(resposta.body.descricao);
    })
  })

  it('06 - Deve buscar o tema por id', async () => {
    return await request(app.getHttpServer())
      .get(`/temas/${temaId}`)
      .set('Authorization',`${token}`)
    .expect(200)
  });

  it('07 - Deve buscar o tema por descricao', async () => {
    return await request(app.getHttpServer())
      .get(`/temas/descricao/lorem`)
      .set('Authorization',`${token}`)
    .expect(200)
  });

  it('08 - Deve Deletar um tema', async () => {
      return await request(app.getHttpServer())
        .delete(`/temas/${temaId}`)
        .set('Authorization',`${token}`)
      .expect(204)
    });


})