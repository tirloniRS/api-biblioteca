import { Request, Response } from 'express'
import { DataSource } from 'typeorm'
import { Livro } from '../entities/Livro'
import { autorRepository } from '../repositories/autorRepository'
import { livroRepository } from '../repositories/livroRepository'
//import { subjectRepository } from '../repositories/subjectRepository'

export class LivroController {
	async create(req: Request, res: Response) {
		const { isbn, titulo, editora, ano_publicacao, status } = req.body

		try {
			const newLivro = livroRepository.create({ isbn, titulo, editora, ano_publicacao, status })
			await livroRepository.save(newLivro)

			return res.status(201).json(newLivro)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	/** CRIAR AUTOR */
	async createAutor(req: Request, res: Response) {
		const { nome, pais_origem } = req.body
		const { idLivro } = req.params

		try {
			const livro = await livroRepository.findOneBy({ idlivro: Number(idLivro) })

			if (!livro) {
				return res.status(404).json({ message: 'Livro não existe.' })
			}

			const newAutor = autorRepository.create({
				nome,
				pais_origem,
				livro,
			})

			await autorRepository.save(newAutor)

			return res.status(201).json(newAutor)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}


	/*	
		async roomSubject(req: Request, res: Response) {
			const { subject_id } = req.body
			const { idRoom } = req.params
	
			try {
				const room = await livroRepository.findOneBy({ id: Number(idRoom) })
	
				if (!room) {
					return res.status(404).json({ message: 'Aula não existe' })
				}
	
				const subject = await subjectRepository.findOneBy({
					id: Number(subject_id),
				})
	
				if (!subject) {
					return res.status(404).json({ message: 'Disciplina não existe' })
				}
	
				const roomUpdate = {
					...room,
					subjects: [subject],
				}
	
				await livroRepository.save(roomUpdate)
	
				return res.status(204).send()
			} catch (error) {
				console.log(error)
				return res.status(500).json({ message: 'Internal Sever Error' })
			}
		}
	*/
	async list(req: Request, res: Response) {
		try {
			const livros = await livroRepository.find({
				relations: {
					//subjects: true,
					autores: true,
				},
			})

			return res.json(livros)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	async buscarPorId(req: Request, res: Response) {
		const { idLivro } = req.params

		try {

			const livro = await livroRepository.findOneBy({ idlivro: Number(idLivro) })
			res.json(livro)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	async atualizar(req: Request, res: Response) {

		const livro = await livroRepository.findOneBy({
			idlivro: Number(req.params.idLivro),
		})

		return res.send(livro)

		/*
		livroRepository.merge(livro, req.body)
		const results = await livroRepository.save(livro)
		return res.send(results)

		*/
	}


}
