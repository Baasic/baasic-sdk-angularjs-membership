/* globals module */
/**
 * @module baasicRegisterRouteService
 * @description Baasic Register Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `baasicRegisterService` uses `baasicRegisterRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
	'use strict';
	module.service('baasicRegisterRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
		return {
			/**
			* Parses register route, this route doesn't support any additional properties. 
			* @method        
			* @example baasicRegisterRouteService.create.expand({});               
			**/ 		
			create: uriTemplateService.parse('register'),
			/**
			* Parses activation route; route should be expanded with the activationToken which uniquely identifies the user account that needs to be activated.
			* @method        
			* @example baasicRegisterRouteService.activate.expand({activationToken: "activationToken"});               
			**/ 			
			activate: uriTemplateService.parse('register/activate/{activationToken}/')
		};
	}]);
}(angular, module));