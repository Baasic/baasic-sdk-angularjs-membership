/* globals module */
/**
 * @module baasicRegisterService
 * @description Baasic Register Service provides an easy way to consume Baasic Application Registration REST API end-points. In order to obtain needed routes `baasicRegisterService` uses `baasicRegisterRouteService`.
*/
(function (angular, module, undefined) {
	'use strict';
	module.service('baasicRegisterService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicRegisterRouteService', 'baasicAuthorizationService',
		function (baasicApiHttp, baasicApiService, baasicConstants, baasicRegisterRouteService, authService) {
			return {
                /**
                * Returns a promise that is resolved once the register create has been performed. This action will create a new user if completed successfully. Created user is not approved immediately, instead an activation e-mail is sent to the user.
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
                * Returns a promise that is resolved once the account activation action has been performed; this action activates a user account and success response returns the token resource.
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
                    return baasicApiHttp({
                        url: baasicRegisterRouteService.activate.expand(params),
                        method: 'PUT'
                    })
					.success(function (data) {
						authService.updateAccessToken(data);
					});                					
				},
                /**
                * Provides direct access to `baasicRegisterRouteService`.
                * @method        
                * @example baasicRegisterService.routeService.get.expand(expandObject);
                **/                
				routeService: baasicRegisterRouteService
			};
		}]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/