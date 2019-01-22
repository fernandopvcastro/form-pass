angular.module("medical",['ngRoute'])

.config(function($routeProvider){
	$routeProvider
	.when("/home",{
		templateUrl:"templates/home.html",
		controller:"indexController"
	})
	.when("/formulario",{
		templateUrl:"templates/formulario.html",
		controller:"formularioController"
	})
	.when("/obrigado",{
		templateUrl:"templates/obrigado.html",
		controller:"obrigadoController"
	});

	$routeProvider.otherwise({redirectTo:"/formulario"});
})