import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'tb_postagens'}) // CREATE TABLE tb_postagens
export class Postagem{

    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO_INCREMENT
    id: number;

    // Remove espaços em branco início/fim
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() // Força digitação
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    titulo: string;
    
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() // Força digitação
    @Column({length: 1000, nullable: false}) // VARCHAR(1000) NOT NULL
    texto: string;
    
    @UpdateDateColumn() // Atualiza a data de criação da postagem com a data atual
    data: Date;

}