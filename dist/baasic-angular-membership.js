(function (angular, undefined) { /* exported module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.membership` module functionality it must be added as a dependency to your app.
     * @module baasic.membership 
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.membership', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicLoginRouteService
     * @description Baasic Login Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Login Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicLoginRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses login route which can be expanded with additional options. Supported items are:                  
                 * - `options` - Comma separated list of options used to setup authentication token with cookie session. Supported values are: "session" and "sliding".
                 * @method        
                 * @example 
                 baasicLoginRouteService.login.expand(
                 {options: 'sliding'}
                 );
                 **/
                login: uriTemplateService.parse('login/{?embed,fields,options}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicLoginRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse,
                social: {
                    /**
                     * Parses get social login route which can be expanded with additional items. Supported items are:
                     * - `provider` - Provider name or Id for which the login URL should be generated.
                     * - `returnUrl` - Redirect Uri for the provider which will be used when the user is redirected back to the application.
                     * @method social.get       
                     * @example 
                     baasicUserRouteService.social.get.expand({
                     provider : '<provider>',
                     returnUrl: '<returnUrl>'
                     });
                     **/
                    get: uriTemplateService.parse('login/social/{provider}/{?returnUrl}'),
                    /**
                     * Parses post social login route which can be expanded with additional items. Supported items are:
                     * - `provider` - Provider name or Id being used to login with.
                     * @method social.get       
                     * @example 
                     baasicUserRouteService.social.post.expand({
                     provider : '<provider>'
                     });
                     **/
                    post: uriTemplateService.parse('login/social/{provider}'),
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicLoginService
     * @description Baasic Register Service provides an easy way to consume Baasic Application Registration REST API end-points. In order to obtain needed routes `baasicLoginService` uses `baasicLoginRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicLoginService', ['baasicConstants', 'baasicApiService', 'baasicApiHttp', 'baasicAuthorizationService', 'baasicLoginRouteService', function (baasicConstants, baasicApiService, baasicApiHttp, authService, loginRouteService) {
            // Getting query string values in javascript: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
            var parseUrlParams = function () {
                var urlParams;
                var match, pl = /\+/g,
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function (s) {
                        return decodeURIComponent(s.replace(pl, ' '));
                    },
                    query = window.location.search.substring(1);

                urlParams = {}; /*jshint -W084 */
                while (match = search.exec(query)) {
                    urlParams[decode(match[1])] = decode(match[2]);
                }
                return urlParams;
            };

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
                    var formData = 'grant_type=password&username=' + settings.username + '&password=' + settings.password;

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
                    }).success(function (data) {
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
                    return baasicApiHttp.get(loginRouteService.login.expand(data), {
                        headers: {
                            'Accept': 'application/json; charset=UTF-8'
                        }
                    });
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
                    }).success(function () {
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
                    post: function (provider, data) {
                        return baasicApiHttp({
                            url: loginRouteService.social.post.expand({
                                provider: provider
                            }),
                            method: 'POST',
                            data: baasicApiService.createParams(data)[baasicConstants.modelPropertyName],
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8'
                            }
                        }).success(function (data) {
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
                    parseResponse: function (provider, returnUrl) {
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
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicPasswordRecoveryRouteService 
     * @description Baasic Password Recovery Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Password Recovery Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicPasswordRecoveryRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses recover-password route, recover-password route doesn't expose any additional properties.
                 * @method        
                 * @example baasicPasswordRecoveryRouteService.passwordRecovery.expand({});               
                 **/
                passwordRecovery: uriTemplateService.parse('recover-password'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicPasswordRecoveryRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicPasswordRecoveryService
     * @description Baasic Password Recovery Service provides an easy way to consume Baasic Password Recovery REST API end-points. In order to obtain needed routes `baasicPasswordRecoveryService` uses `baasicPasswordRecoveryRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicPasswordRecoveryService', ['baasicApiHttp', 'baasicPasswordRecoveryRouteService', function (baasicApiHttp, passwordRecoveryRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the password recovery requestReset action is completed. This action initiates the password recovery process for the user.
                 * @method
                 * @example
                 baasicPasswordRecoveryService.requestReset({
                 challengeIdentifier : '<challenge-identifier>',
                 challengeResponse : '<challenge-response>',
                 recoverUrl : '<recover-url>',
                 username : '<username>'
                 })
                 .success(function () {
                 // perform success action here
                 })
                 .error(function (data) {
                 // perform error handling here
                 })
                 .finally (function () {});
                 */
                requestReset: function (data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: 'POST',
                        data: data
                    });
                },
                /**
                 * Returns a promise that is resolved once the password reset action is completed. This updates user's password selection.
                 * @method
                 * @example
                 baasicPasswordRecoveryService.reset({
                 newPassword : '<new-password>',
                 passwordRecoveryToken : '<password-recovery-token>'
                 })
                 .success(function () {
                 // perform success action here
                 })
                 .error(function (data) {
                 // perform error handling here
                 })
                 .finally (function () {});
                 */
                reset: function (data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: 'PUT',
                        data: data
                    });
                },
                /**
                 * Provides direct access to `baasicPasswordRecoveryRouteService`.
                 * @method        
                 * @example baasicPasswordRecoveryService.routeService.get.expand(expandObject);
                 **/
                routeService: passwordRecoveryRouteService
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicRegisterRouteService
     * @description Baasic Register Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Register Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
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
                 * Parses activation route; route should be expanded with the `activationToken` which uniquely identifies the user account that needs to be activated.
                 * @method        
                 * @example 
                 baasicRegisterRouteService.activate.expand(
                 {activationToken: '<activation-token>'}
                 );
                 **/
                activate: uriTemplateService.parse('register/activate/{activationToken}/')
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicRegisterService
     * @description Baasic Register Service provides an easy way to consume Baasic Application Registration REST API end-points. In order to obtain needed routes `baasicRegisterService` uses `baasicRegisterRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicRegisterService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicRegisterRouteService', 'baasicAuthorizationService', function (baasicApiHttp, baasicApiService, baasicConstants, baasicRegisterRouteService, authService) {
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
                    }).success(function (data) {
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
    /* globals module */
    /**
     * @module baasicRoleRouteService
     * @description Baasic Role Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Role Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicRoleRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find role route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify role resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain role subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * @method        
                 * @example 
                 baasicRoleRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse('lookups/roles/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get role route which should be expanded with the role Id. Note that the role Id is the primary key of the role.
                 * @method        
                 * @example 
                 baasicRoleRouteService.get.expand(
                 {id: '<role-id>'}
                 );
                 **/
                get: uriTemplateService.parse('lookups/roles/{id}/{?embed,fields}'),
                /**
                 * Parses create role route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicRoleRouteService.create.expand({});               
                 **/
                create: uriTemplateService.parse('lookups/roles'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicRoleRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicRoleService
     * @description Baasic Role Service provides an easy way to consume Baasic Role REST API end-points. In order to obtain needed routes `baasicRoleService` uses `baasicRoleRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicRoleService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicRoleRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, roleRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of role resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicRoleService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(roleRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified role resource.
                 * @method        
                 * @example 
                 baasicRoleService.get('<role-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(roleRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the create action has been performed; this action creates a role.
                 * @method        
                 * @example 
                 baasicRoleService.create({
                 description : '<description>',
                 name : '<name>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(roleRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the update role action has been performed; this action updates a role. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicRoleService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(role);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // role is a resource previously fetched using get action.
                 role.name = '<new-name>';
                 baasicRoleService.update(role)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the remove role action has been performed. This action will remove a role from the system, if completed successfully. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicRoleService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(role);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // Role is a resource previously fetched using get action.
                 baasicRoleService.remove(role)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `baasicRoleRouteService`.
                 * @method        
                 * @example baasicRoleService.routeService.get.expand(expandObject);
                 **/
                routeService: roleRouteService
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */

    /**
     * @module baasicUserRouteService
     * @description Baasic User Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses user exists route; URI template should be expanded with the username whose availability you'd like to check.                
                 * @method        
                 * @example 
                 baasicUserRouteService.exists.expand(
                 {username: '<username>'}
                 );
                 **/
                exists: uriTemplateService.parse('users/{username}/exists/'),
                /**
                 * Parses find user route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing user properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain user subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicUserRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse('users/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get user route which must be expanded with the username of the previously created user resource in the system. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicUserRouteService.get.expand(
                 {username: '<username>'}
                 );
                 **/
                get: uriTemplateService.parse('users/{username}/{?embed,fields}'),
                /**
                 * Parses create user route, this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('users'),
                /**
                 * Parses change password route, URI template should be expanded with the username of the user resource whose password should be updated.
                 * @method        
                 * @example 
                 baasicUserRouteService.changePassword.expand(
                 {username: '<username>'}
                 );
                 **/
                changePassword: uriTemplateService.parse('users/{username}/change-password'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicUserRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse,
                socialLogin: {
                    /**
                     * Parses get social login route, URI template should be expanded with the username of the user resource whose social login connections should be retrieved.
                     * @method socialLogin.get       
                     * @example 
                     baasicUserRouteService.socialLogin.get.expand({
                     username : '<username>'
                     });
                     **/
                    get: uriTemplateService.parse('users/{username}/social-login'),
                    /**
                     * Parses remove social login route which can be expanded with additional items. Supported items are:
                     * - `username` - A username which uniquely identifies an application user whose social login connection needs to be removed.
                     * - `provider` - Provider from which to disconnect the login resource from.
                     * @method socialLogin.remove 
                     * @example 
                     baasicUserRouteService.socialLogin.remove.expand({
                     username : '<username>',
                     provider : '<provider>'
                     });
                     **/
                    remove: uriTemplateService.parse('users/{username}/social-login/{provider}')
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicUserService
     * @description Baasic User Service provides an easy way to consume Baasic User REST API end-points. In order to obtain needed routes `baasicUserService` uses `baasicUserRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the exists action has been performed. This action checks if user exists in the application.
                 * @method        
                 * @example 
                 baasicUserService.exists('<username>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                exists: function (username, options) {
                    return baasicApiHttp.get(userRouteService.exists.expand(baasicApiService.getParams(username, options, 'username')));
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicUserService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(userRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified user resource.
                 * @method        
                 * @example 
                 baasicUserService.get({
                 username : '<username>',
                 embed : '<embedded-resource>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (options) {
                    return baasicApiHttp.get(userRouteService.get.expand(baasicApiService.getParams(options, 'username')));
                },
                /**
                 * Returns a promise that is resolved once the create user action has been performed; this action creates a new user.
                 * @method        
                 * @example 
                 baasicUserService.create({
                 confirmPassword : '<password>',
                 email : '<email>',
                 password : '<password>',
                 sendEmailNotification : true,
                 username : '<username>',
                 roles: ['<role-name>'],
                 additionalProperty: '<additional-property>'  
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(userRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the update user action has been performed; this action updates a user. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 user.roles = ['<role-name>', '<new-role-name>'];
                 user.email = '<new-email>';
                 baasicUserService.update(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the remove user action has been performed. This action will remove a user from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 baasicUserService.remove(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the unlock user action has been performed. This action will unlock the user resource which was previously locked either manually or automatically by the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('unlock').href;
                 ```
                 * @method        
                 * @example 
                 //  user is a resource previously fetched using get action.
                 baasicUserService.unlock(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unlock: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unlock').href);
                },
                /**
                 * Returns a promise that is resolved once the lock user action has been performed. This action will lock the user resource out of the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('lock').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 baasicUserService.lock(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                lock: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('lock').href);
                },
                /**
                 * Returns a promise that is resolved once the approve user action has been performed. This action will mark the user resource as 'approved' in the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('approve').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 baasicUserService.lock(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                approve: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('approve').href);
                },
                /**
                 * Returns a promise that is resolved once the disapprove user action has been performed. This action will mark the user resource as 'not approved' in the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('disapprove').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 baasicUserService.lock(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                disapprove: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('disapprove').href);
                },
                /**
                 * Returns a promise that is resolved once the changePassword action has been performed. This action will update user's password selection.
                 * @method        
                 * @example 
                 baasicUserService.changePassword('<username>', {
                 newPassword : '<new-password>',
                 sendMailNotification : false
                 })
                 .success(function () {
                 // perform success action here
                 })
                 .error(function (data, status, headers, config) {
                 // perform error handling here
                 })
                 .finally (function () {});
                 **/
                changePassword: function (username, data) {
                    return baasicApiHttp({
                        url: userRouteService.changePassword.expand({
                            username: username
                        }),
                        method: 'PUT',
                        data: data
                    });
                },
                /**
                 * Provides direct access to `baasicUserRouteService`.
                 * @method        
                 * @example baasicUserService.routeService.get.expand(expandObject);
                 **/
                routeService: userRouteService,
                socialLogin: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list user resource connected social login providers.
                     * @method socialLogin.get
                     * @example 
                     baasicUserService.socialLogin.get('<username>')
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (username) {
                        return baasicApiHttp.get(userRouteService.socialLogin.get.expand({
                            username: username
                        }));
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action removes the user resource social login connection from the specified provider.
                     * @method socialLogin.remove
                     * @example 
                     baasicUserService.socialLogin.remove('<username>', '<provider>')
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (username, provider) {
                        var params;
                        if (provider.hasOwnProperty('abrv')) {
                            params = {
                                provider: provider.abrv
                            };
                        } else if (provider.hasOwnProperty('id')) {
                            params = {
                                provider: provider.id
                            };
                        } else {
                            params = angular.extend({}, provider);
                        }
                        params.username = username;
                        return baasicApiHttp.delete(userRouteService.socialLogin.remove.expand(baasicApiService.findParams(params)));
                    }
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
})(angular);