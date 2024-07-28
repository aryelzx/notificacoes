export class CreateUserDto {
    nome: string;
    email: string;
    fone: string;
    profissao: string;
    data_nascimento: Date | string;
}