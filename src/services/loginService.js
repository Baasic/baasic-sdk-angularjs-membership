/* globals module */
/**
 * @module baasicLoginService
 * @description Baasic Register Service provides an easy way to consume Baasic application registration features.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicLoginService', ['baasicApiHttp', 'baasicLoginRouteService',
        function (baasicApiHttp, loginRouteService) {
            return {
                routeService: loginRouteService,
                 /**
                 * Returns a promise that is resolved once the login action has been performed. Success response returns the token resource.
                 * @method        
                 * @example 
baasicLoginService.login({
  userName : "<userName>",
  password : "<password>",
  options : ['session', 'sliding']
})
.success(function (data) {
  // perform success actions here
})
.error(function (data, status) {
  // perform error handling here
})
.finally (function () {});       
                 **/  				
                login: function login(data) {
                    var settings = angular.copy(data);
                    var formData = 'grant_type=password&username=' + settings.userName + '&password=' + settings.password;

                    if (settings.options) {
                        var options = settings.options;
                        if (angular.isArray(options)) {
                            settings.options = options.join();
                        }
                    }

                    return baasicApiHttp({
                        url: loginRouteService.login.expand(settings),
                        method: 'POST',
                        data: formData,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    });
                },
				/**
				* Returns a promise that is resolved once the loadUserData action has been performed. This action retrives the account information of the currently logged in user.
				* @method
				* @example
baasicLoginService.loadUserData()
.success(function (data) {
  // perform success actions here
})
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                loadUserData: function loadUserData(data) {
                    data = data || {};
                    return baasicApiHttp.get(loginRouteService.login.expand(data), { headers: { 'Accept': 'application/json; charset=UTF-8' } });
                },
				/**
				* Returns a promise that is resolved once the logout action has been performed. This action invalidates user token logging the user out of the system.
				* @method
				* @example
var token = baasicAuthorizationService.getAccessToken();
baasicLoginService.logout(token.access_token, token.token_type)
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                logout: function logout(token, type) {
                    return baasicApiHttp({
                        url: loginRouteService.login.expand({}),
                        method: 'DELETE',
                        data: {
                            token: token,
                            type: type
                        }
                    });
                }
            };
        }]);
}(angular, module));