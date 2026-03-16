import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Tema')
@UseGuards(JwtAuthGuard)
@Controller('/temas')
@ApiBearerAuth()
export class TemaController{

    constructor(
        private readonly temaService: TemaService
    ){}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]>{
        return this.temaService.findAll();
    }

    @Get('/:id') // indica que id é uma var de caminho
    @HttpCode(HttpStatus.OK) // ⬇️ transforma a string caminho no parametro id do tipo number
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema>{
        return this.temaService.findById(id);
    }

    @Get('/descricao/:descricao') // http://localhost:4000/postagens/titulo/ o que eu quero procurar 
    @HttpCode(HttpStatus.OK) // ⬇️ transforma a string caminho no parametro
    findAllByDescricao(@Param('descricao') descricao: string): Promise<Tema[]>{
        return this.temaService.findAllByDescricao(descricao);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED) 
    create(@Body() tema: Tema): Promise<Tema>{
        return this.temaService.create(tema);
    // o decorador @Body extrai o corpo do obj do obj req e preenche
    // o parametro decorado com o valor do corpo
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK) 
    update(@Body() tema: Tema): Promise<Tema>{
        return this.temaService.update(tema);
    
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT) // NO_CONTENT 
    delete(@Param('id', ParseIntPipe) id: number){
        return this.temaService.delete(id);
    }

}