import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({name:'tb_postagens'}) // CREATE TABLE tb_postagens
export class Postagem{

    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO_INCREMENT
    id: number;

    // Remove espaços em branco início/fim
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() // Força digitação
    @Length(5, 100, {message: 'O texto deve ter entre 5 e 100 caracteres'})
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    titulo: string;
    
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() // Força digitação
    @Length(10, 1000, {message: 'O texto deve ter entre 10 e 1000 caracteres'})
    @Column({length: 1000, nullable: false}) // VARCHAR(1000) NOT NULL
    texto: string;
    
    @UpdateDateColumn() // Atualiza a data de criação da postagem com a data atual
    data: Date;
    
    @ManyToOne( () => Tema, (tema) => tema.postagem, {
        onDelete: 'CASCADE'
    })
    tema: Tema; // Rrepresenta a chave estrangeira

}