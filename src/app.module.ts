import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
	    useClass: DevService, // só alterar para DevService se for usar localmente
      imports: [ConfigModule],
    }),
    PostagemModule, TemaModule, AuthModule, UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
