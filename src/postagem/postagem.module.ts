import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaModule } from "../tema/tema.module";

@Module({
    imports:[TypeOrmModule.forFeature([Postagem]), TemaModule], // modulo importado para permirtir o uso de TemaService
    controllers: [PostagemController],
    providers: [PostagemService],
    exports:[]
})

export class PostagemModule{}