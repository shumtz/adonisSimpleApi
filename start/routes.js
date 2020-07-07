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
const Route = use('Route');

// Views
Route.on('/').render('main');
Route.on('/login').render('login.login');
Route.on('/register').render('login.register');
Route.on('/dashboard').render('login.dashboard').middleware('auth');

// Auth
Route.group(() => {
  Route.post('/', 'UserController.login');
  Route.get('/:id', 'UserController.show').middleware('auth');
  Route.post('/register', 'UserController.create');
}).prefix('/auth');

// Api
Route.group(() => {
  Route.get('/', 'ListController.index');
  Route.post('/create', 'ListController.create');
  Route.get('/:id', 'ListController.show');
  Route.delete('/:id/delete', 'ListController.destroy');
}).prefix('/api/v1');
