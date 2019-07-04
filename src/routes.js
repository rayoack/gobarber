const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

// MIDDLEWARES PARA A SESSÃO
const authMiddleware = require('./app/middleware/auth')
const guestMiddleware = require('./app/middleware/guest')

// CONTROLLERS
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')
const ScheduleController = require('./app/controllers/ScheduleController')

// MENSAGENS DE ERRO NO LOGIN
routes.use((req, res, next) => {
  res.locals.flashSucess = req.flash('sucess')
  res.locals.flashError = req.flash('error')

  return next()
})

// ROTA PARA TER ACESSO AS IMAGENS
routes.get('/files/:file', FileController.show)

// ROTAS
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

// ROTAS PARA AGENDAMENTO
routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)
routes.get('/app/available/:provider', AvailableController.index)

routes.get('/app/schedule', ScheduleController.index)

module.exports = routes
