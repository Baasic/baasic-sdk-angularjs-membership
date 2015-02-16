/**
 * @module baasicUserRegisterRouteService
**/

/** 
 * @overview Register route service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
	"use strict";
	module.service("baasicUserRegisterRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
		return {
			/**
			* Parses register route, this route doesn't support any additional properties. 
			* @method        
			* @example baasicUserRegisterRouteService.create.expand({});               
			**/ 		
			create: uriTemplateService.parse("register"),
			/**
			* Parses activation route, route should be expanded with the activationToken which uniquely identifies the user account that needs to be activated.
			* @method        
			* @example baasicLoginRouteService.activate.expand({activationToken: "activationToken"});               
			**/ 			
			activate: uriTemplateService.parse("register/activate/{activationToken}/")
		};
	}]);
}(angular, module));