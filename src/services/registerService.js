/* globals module */
/**
 * @module baasicRegisterService
**/

/** 
 * @overview Register service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
	'use strict';
	module.service('baasicRegisterService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserRegisterRouteService', 
		function (baasicApiHttp, baasicApiService, baasicConstants, baasicUserRegisterRouteService) {
			return {
				routeService: baasicUserRegisterRouteService,
                /**
                * Returns a promise that is resolved once the register create has been performed. Success response returns the created user resource.
                * @method        
                * @example 
baasicRegisterService.create({
  activationUrl : "activationUrl",
  challengeIdentifier : "challengeIdentifier",
  challengeResponse : "challengeResponse",
  confirmPassword : "confirmPassword",
  email : "email",
  password : "password",
  userName : "userName"
})
.success(function (data) {
  // perform success actions here
})
.error(function (data, status) {
  // perform error handling here
})
.finally (function () {});
                **/  					
				create: function (data) {
					return baasicApiHttp.post(baasicUserRegisterRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
				},
                /**
                * Returns a promise that is resolved once the acount activation action has been performed.
                * @method        
                * @example 
baasicRegisterService.activate({
  activationToken : "activationToken"
})
.success(function (data) {
  // perform success actions here
})
.error(function (data, status) {
  // perform error handling here
})
.finally (function () {});
                **/  				
				activate: function (data) {
					var params = baasicApiService.getParams(data, 'activationToken');
					return baasicApiHttp.put(baasicUserRegisterRouteService.activate.expand(params), {});
				}
			};
		}]);
}(angular, module));