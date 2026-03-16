import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller('/postagens')
@ApiBearerAuth()
export class PostagemController{

    constructor(
        private readonly postagemService: PostagemService
    ){}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }

    @Get('/:id') // indica que id é uma var de caminho
    @HttpCode(HttpStatus.OK) // ⬇️ transforma a string caminho no parametro id do tipo number
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo') // http://localhost:4000/postagens/titulo/ o que eu quero procurar 
    @HttpCode(HttpStatus.OK) // ⬇️ transforma a string caminho no parametro
    findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findAllByTitulo(titulo);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED) 
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem);
    // o decorador @Body extrai o corpo do obj do obj req e preenche
    // o parametro decorado com o valor do corpo
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK) 
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem);
    
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT) // NO_CONTENT 
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id);
    }

}