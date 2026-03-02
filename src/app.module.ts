import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem],

      // atualiza a tabela em tempo real
      // em ambiente de produção deve ficar
      // marcada como false
      synchronize: true,
    }),
    PostagemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
