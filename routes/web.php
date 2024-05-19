<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\VoterInfoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


//Route::get('/',function(){
//    view('index');
//});
Route::get('/',[HomeController::class,'HomePage']);

Route::get('/dashboard',[DashboardController::class,'DashboardPage']);

Route::get('/voterlist', [VoterInfoController::class, 'voterlist'])->name('voterinfo.voterlist');
Route::get('/voterlistdata', [VoterInfoController::class, 'voterlistdata'])->name('voterinfo.voterlistdata');
Route::get('/addvoterInfo', [VoterInfoController::class, 'addvoterInfo'])->name('voterinfo.index');
Route::post('/addvoterInfo', [VoterInfoController::class, 'storeVoterInfo'])->name('voterinfo.store');
Route::get('/uploadvoterinfo', [VoterInfoController::class, 'uploadvoterinfo'])->name('voterinfo.upload');
Route::post('/uploadvoterinfo', [VoterInfoController::class, 'uploadvoterinfo'])->name('voterinfo.storefile');
Route::post('/search-voter-data', [VoterInfoController::class, 'searchVoterInfo'])->name('voterinfo.searchVoterInfo');






//Route::get('/dashboard/userinfo',[VoterInfoController::class,'index']);
//Route::get('/dashboard/userinfo',[VoterInfoController::class,'createUser']);
//Route::get('dashboard/user', [VoterInfoController::class, 'index'])->name('user.index');
//Route::get('dashboard/user/create', [VoterInfoController::class, 'createUser'])->name('user.create');
//Route::post('dashboard/user/update', [VoterInfoController::class, 'updateUser'])->name('user.store');

