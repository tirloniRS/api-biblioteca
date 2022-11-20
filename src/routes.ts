import { Router } from 'express'
import { LivroController } from './controllers/LivroController'
//import { SubjectController } from './controllers/SubjectController'

const routes = Router()

//routes.post('/subject', new SubjectController().create)
routes.post('/livro', new LivroController().create)
routes.get('/livro', new LivroController().list)
routes.post('/livro/:idLivro/create', new LivroController().createAutor)
routes.get('/livro/:idLivro', new LivroController().buscarPorId)
routes.put('/livro/:idLivro', new LivroController().atualizar)
//routes.post('/room/:idRoom/subject', new RoomController().roomSubject)
export default routes
