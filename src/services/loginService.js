/* globals module */
/**
 * @module baasicLoginService
 * @description Baasic Register Service provides an easy way to consume Baasic Application Registration REST API end-points. In order to obtain needed routes `baasicLoginService` uses `baasicLoginRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicLoginService', ['baasicConstants', 'baasicApiService', 'baasicApiHttp', 'baasicAuthorizationService', 'baasicLoginRouteService',
        function (baasicConstants, baasicApiService, baasicApiHttp, authService, loginRouteService) {

            return {
                 /**
                 * Returns a promise that is resolved once the login action has been performed. This action logs user into the application and success response returns the token resource.
                 * @method        
                 * @example 
baasicLoginService.login({
  username : '<username>',
  password : '<password>',
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

                    if (settings.options) {
                        var options = settings.options;
                        if (angular.isArray(options)) {
                            settings.options = options.join();
                        }
                    }

                    return baasicApiHttp({
                        url: loginRouteService.login.expand(settings),
                        method: 'POST',
                        data: transformData({
                            grant_type: 'password', // jshint ignore:line
                            username: settings.username,
                            password: settings.password
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    })
					.success(function (data) {
						authService.updateAccessToken(data);
					});
                },
				/**
				* Returns a promise that is resolved once the loadUserData action has been performed. This action retrieves the account information of the currently logged in user. Retrieved account information will contain permission collection which identifies access policies assigned to the user and application sections.
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
                    })
					.success(function () {
						authService.updateAccessToken(null);
					});
                },
                /**
                * Provides direct access to `baasicLoginRouteService`.
                * @method        
                * @example baasicLoginService.routeService.get.expand(expandObject);
                **/             
                routeService: loginRouteService,
                social: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a resolved social login provider Url.
                    * @method social.get
                    * @example 
baasicLoginService.social.get('<provider>', '<returnUrl>')
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/                 
                    get: function (provider, returnUrl) {
                        var params = {
                            provider: provider,
                            returnUrl: returnUrl
                        };
                        return baasicApiHttp.get(loginRouteService.social.get.expand(baasicApiService.findParams(params)));
                    },
                    /**
                    * Returns a promise that is resolved once the post action has been performed. This action logs user into the application and success response returns the token resource.
                    * @method social.post
                    * @example 
var postData = {
  email : '<email>',
  code:'<code>',
  activationUrl : '<activationUrl>',
  oAuthToken : '<oAuthToken>',
  oAuthVerifier : '<oAuthVerifier>',
  password : '<password>',
  returnUrl : '<returnUrl>'
};                    
baasicLoginService.social.post('<provider>', postData)
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/                 
                    post: function (provider, data, options) { 
                        var params = { provider: provider };
                        if (options){
                            params.options = options;
                        }
                        return baasicApiHttp({
                            url: loginRouteService.social.post.expand({provider: provider, options: options}),
                            method: 'POST',
                            data: baasicApiService.createParams(data)[baasicConstants.modelPropertyName],
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8'
                            }
                        })
                        .success(function (data) {
                            if (data && !data.status) {
                                authService.updateAccessToken(data);
                            }
                        });                                            
                    },                    
                    /**
                    * Parses social provider response parameters.
                    * @method social.parseResponse
                    * @example baasicLoginService.social.parseResponse('<provider>');
                    **/                      
                    parseResponse: function(provider, returnUrl) {
                        var params = parseUrlParams();
                        var result = {};
                        switch (provider) {
                            case 'twitter':
                                /*jshint camelcase: false */
                                result.oAuthToken = params.oauth_token;
                                result.oAuthVerifier = params.oauth_verifier;
                                break;                            
                            default:
                                result.code = params.code;
                                result.returnUrl = returnUrl;
                                break;
                        }
                        return result;
                    }
                }                
            };

            // Getting query string values in javascript: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
            function parseUrlParams() {
                var urlParams;
                var match,
                    pl = /\+/g,
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); },
                    query = window.location.search.substring(1);

                urlParams = {};
                /*jshint -W084 */
                while (match = search.exec(query)) {
                    urlParams[decode(match[1])] = decode(match[2]);
                }
                return urlParams;
            }

            /**
             * Returns url encoded form data.
             */
            function transformData(data) {
                var items = [];
                angular.forEach(data, function (value, key) {
                    items.push([encodeURIComponent(key), encodeURIComponent(value)].join('='));
                });

                return items.join('&');
            }
        }]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/