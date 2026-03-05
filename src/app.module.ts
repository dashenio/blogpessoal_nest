import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema],

      // atualiza a tabela em tempo real
      // em ambiente de produção deve ficar
      // marcada como false
      synchronize: true,
      logging: false,
    }),
    PostagemModule, TemaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
