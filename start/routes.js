'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.on('/login').render('login')
Route.on('/register').render('register')
Route.on('/dashboard').render('dashboard').middleware('auth')

Route.post('/auth', 'UserController.login')
Route.get('/auth/show/:id', 'UserController.show').middleware('auth')
Route.post('/auth/register', 'UserController.create')

Route.on('/').render('main')
Route.get('/api', 'ListController.index')
Route.post('/api/create', 'ListController.create')
Route.get('/api/:id', 'ListController.show')
Route.delete('/api/:id/delete', 'ListController.destroy')