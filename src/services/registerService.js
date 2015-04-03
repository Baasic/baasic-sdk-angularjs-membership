/* globals module */
/**
 * @module baasicRegisterService
 * @description Baasic Register Service provides an easy way to consume Baasic application registration features. In order to obtain a needed routes `baasicRegisterService` uses `baasicRegisterRouteService`.
*/
(function (angular, module, undefined) {
	'use strict';
	module.service('baasicRegisterService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicRegisterRouteService', 
		function (baasicApiHttp, baasicApiService, baasicConstants, baasicRegisterRouteService) {
			return {
                /**
                * Provides direct access to `baasicRegisterRouteService`.
                * @method        
                * @example baasicRegisterService.routeService.get.expand(expandObject);
                **/                
				routeService: baasicRegisterRouteService,
                /**
                * Returns a promise that is resolved once the register create has been performed. This action creates a new user, if completed successfully. Created user is not approved immediately, instead an activation e-mail is sent to the user.
                * @method        
                * @example 
baasicRegisterService.create({
  activationUrl : '<activation-url>',
  challengeIdentifier : '<challenge-identifier>',
  challengeResponse : '<challenge-response>',
  confirmPassword : '<confirm-password>',
  email : '<email>',
  password : '<password>',
  username : '<username>'
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
					return baasicApiHttp.post(baasicRegisterRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
				},
                /**
                * Returns a promise that is resolved once the acount activation action has been performed, this action activates a user account.
                * @method        
                * @example 
baasicRegisterService.activate({
  activationToken : '<activation-token>'
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
					return baasicApiHttp.put(baasicRegisterRouteService.activate.expand(params), {});
				}
			};
		}]);
}(angular, module));
/**
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/