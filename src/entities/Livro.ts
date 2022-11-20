import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Autor } from './Autor'

/* Defini que é uma ENTIDADE */
@Entity('livros') /*Será a tabela rooms no BD */
export class Livro {
	@PrimaryGeneratedColumn()
	idlivro: number

	@Column({ type: 'text', nullable: false, comment: "Código ISBN do Livro" })
	isbn: string

	@Column({ type: 'text', nullable: false, comment: "Título do livro" })
	titulo: string

	@Column({ type: 'text', nullable: false, comment: "Editora do livro" })
	editora: string

	/* Type poderia ser YEAR */
	@Column({ type: 'text', nullable: false, comment: "Ano de publicação do livro" })
	ano_publicacao: string

	@Column({ type: 'text', nullable: false, comment: "Status: DISPONIVEL, LOCADO, DANIFICADO" })
	status: string

	@OneToMany(() => Autor, autor => autor.livro)
	autores: Autor[]
}