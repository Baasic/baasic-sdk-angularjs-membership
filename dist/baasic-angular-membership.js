(function (angular, undefined) { /* exported module */
    /** 
     * @overview The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */

    /**
     * An angular module is a container for the different parts of your app - services, directives etc. In order to use baasic.membership module functionality it must be added as a dependency to your app.
     * @module baasic.membership 
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.appSettings",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.membership', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicLoginRouteService
     **/

    /** 
     * @overview Login route service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicLoginRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses login route which can be expanded with additional options. Supported items are: 
                 * - `type` - A Login Type which defines how the user authenticates into the system. Supported values are: "oauth" and "forms".
                 * - `options` - Comma separated list of options used to setup authentication token with cookie session. Supported values are: "session" and "sliding".
                 * @method        
                 * @example baasicLoginRouteService.login.expand({options: 'sliding', type: 'oauth'});               
                 **/
                login: uriTemplateService.parse('login/{?embed,fields,options}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module)); /* globals module */
    /**
     * @module baasicLoginService
     **/

    /** 
     * @overview Login service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicLoginService', ['baasicApiHttp', 'baasicLoginRouteService', function (baasicApiHttp, loginRouteService) {
            return {
                routeService: loginRouteService,
                /**
                 * Returns a promise that is resolved once the login action has been performed. Success response returns the token resource.
                 * @method        
                 * @example 
                 baasicLoginService.login({
                 userName : "userName",
                 password : "password",
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
                    });
                }
            };
        }]);
    }(angular, module)); /* globals module */
    /**
     * @module baasicPasswordRecoveryRouteService
     **/

    /** 
     * @overview Password recovery route service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
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
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module)); /* globals module */
    /**
     * @module baasicPasswordRecoveryService
     **/

    /** 
     * @overview Password recovery service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicPasswordRecoveryService', ['baasicApiHttp', 'baasicPasswordRecoveryRouteService', function (baasicApiHttp, passwordRecoveryRouteService) {
            return {
                routeService: passwordRecoveryRouteService,
                /**
                 * Returns a promise that is resolved once the password recovery requestReset action is completed. This initiates the password recovery process for the user.
                 * @method
                 * @example
                 baasicPasswordRecoveryRouteService.requestReset({
                 challengeIdentifier : "challengeIdentifier",
                 challengeResponse : "challengeResponse",
                 recoverUrl : "recoverUrl",
                 userName : "userName"
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
                 * Returns a promise that is resolved once the password reset action is completed. This updates the user password selection.
                 * @method
                 * @example
                 baasicPasswordRecoveryRouteService.reset({
                 newPassword : "newPassword",
                 passwordRecoveryToken : "passwordRecoveryToken"
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
                }
            };
        }]);
    }(angular, module)); /* globals module */
    /**
     * @module baasicRegisterRouteService
     **/

    /** 
     * @overview Register route service.
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
                 * @example baasicLoginRouteService.activate.expand({activationToken: "activationToken"});               
                 **/
                activate: uriTemplateService.parse('register/activate/{activationToken}/')
            };
        }]);
    }(angular, module)); /* globals module */
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
        module.service('baasicRegisterService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserRegisterRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, baasicUserRegisterRouteService) {
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
    }(angular, module)); /* globals module */
    /**
     * @module baasicRoleRouteService
     **/

    /** 
     * @overview Role route service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicRoleRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find role route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                 * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * @method        
                 * @example baasicRoleRouteService.find.expand({searchQuery: "searchTerm"});               
                 **/
                find: uriTemplateService.parse('roles/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get role route which should be expanded with the role Id. Note that the role Id is the primary key of the role.
                 * @method        
                 * @example baasicRoleRouteService.get.expand({id: "uniqueID"});               
                 **/
                get: uriTemplateService.parse('roles/{id}/{?embed,fields}'),
                /**
                 * Parses create role route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicRoleRouteService.create.expand({});               
                 **/
                create: uriTemplateService.parse('roles'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module)); /* globals module */
    /**
     * @module baasicRoleService
     **/

    /** 
     * @overview Role service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicRoleService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicRoleRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, roleRouteService) {
            return {
                routeService: roleRouteService,
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of role resources.
                 * @method        
                 * @example 
                 baasicRoleService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : "name",
                 orderDirection : "desc",
                 search : "searchTerm"
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
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the role resource.
                 * @method        
                 * @example 
                 baasicRoleService.get("uniqueID")
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
                 * Returns a promise that is resolved once the create action has been performed. Success response returns the requested role resource.
                 * @method        
                 * @example 
                 baasicRoleService.create({
                 description : "role description",
                 name : "role name"
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
                 * Returns a promise that is resolved once the update role action has been performed.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.name = "updated role name";
                 baasicRoleService.update(existingResource)
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
                 * Returns a promise that is resolved once the remove role action has been performed. If the action is successfully completed the role resource is permanently removed from the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicRoleService.remove(existingResource)
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
                }
            };
        }]);
    }(angular, module)); /* globals module */

    /**
     * @module baasicUserRouteService
     **/

    /** 
     * @overview User route service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses user exists route; URI template should be expanded with the username whose availability you'd like to check.                
                 * @method        
                 * @example baasicUserRouteService.exists.expand({userName: "userNameToCheck"});               
                 **/
                exists: uriTemplateService.parse('users/{userName}/exists/'),
                /**
                 * Parses find user route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                 * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserRouteService.find.expand({searchQuery: "searchTerm"});               
                 **/
                find: uriTemplateService.parse('users/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get user route which must be expanded with the userName of the previously created user resource in the system. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserRouteService.get.expand({userName: "userNameToFetch"});               
                 **/
                get: uriTemplateService.parse('users/{userName}/{?embed,fields}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/
                parse: uriTemplateService.parse,
                /**
                 * Parses create user route, this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('users'),
                /**
                 * Parses change password route, URI template should be expanded with the Username of the user resource whose password should be updated.
                 * @method        
                 * @example baasicUserRouteService.changePassword.expand({userName: "userName"});              
                 **/
                changePassword: uriTemplateService.parse('users/{userName}/change-password'),
            };
        }]);
    }(angular, module)); /* globals module */
    /**
     * @module baasicUserService
     **/

    /** 
     * @overview User service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userRouteService) {
            return {
                routeService: userRouteService,
                /**
                 * Returns a promise that is resolved once the exists action has been performed. The action checks the availability of a desired Username.
                 * @method        
                 * @example 
                 baasicUserService.exists("userNameToCheck")
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                exists: function (userName, options) {
                    return baasicApiHttp.get(userRouteService.exists.expand(baasicApiService.getParams(userName, options, 'userName')));
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user resources.
                 * @method        
                 * @example 
                 baasicUserService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : "username",
                 orderDirection : "desc",
                 search : "searchTerm"
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (data) {
                    return baasicApiHttp.get(userRouteService.find.expand(baasicApiService.findParams(data)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user resource.
                 * @method        
                 * @example 
                 baasicUserService.get({
                 userName : "userName",
                 embed : "embeddedResource"
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (data) {
                    return baasicApiHttp.get(userRouteService.get.expand(baasicApiService.getParams(data, 'userName')));
                },
                /**
                 * Returns a promise that is resolved once the create user action has been performed. Success response returns the created user resource.
                 * @method        
                 * @example 
                 baasicUserService.create({
                 confirmPassword : "password",
                 email : "email",
                 password : "password",
                 sendEmailNotification : true,
                 userName : "userName",
                 roles: ["role"],
                 additionalProperty: "additionalProperty"  
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
                 * Returns a promise that is resolved once the update user action has been performed.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.roles = ["role", "new role"];
                 existingResource.email = "new email";
                 baasicUserService.update(existingResource)
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
                 * Returns a promise that is resolved once the remove user action has been performed. If the action is successfully completed the user resource is permanently removed from the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicUserService.remove(existingResource)
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
                 * Returns a promise that is resolved once the unlock user action has been performed. This action will unlock the user resource which was previously locked either manually or automatically by the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicUserService.unlock(existingResource)
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
                 * Returns a promise that is resolved once the lock user action has been performed. This action will lock the user resource out of the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicUserService.lock(existingResource)
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
                 * Returns a promise that is resolved once the approve user action has been performed. This action will mark the user resource as approved in the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicUserService.lock(existingResource)
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
                 * Returns a promise that is resolved once the disapprove user action has been performed. This action will mark the user resource as not approved in the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicUserService.lock(existingResource)
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
                 * Returns a promise that is resolved once the changePassword action has been performed. This action will update the user's password selection.
                 * @method        
                 * @example 
                 userService.changePassword("userName", {
                 newPassword : "new password",
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
                changePassword: function (userName, data) {
                    return baasicApiHttp({
                        url: userRouteService.changePassword.expand({
                            userName: userName
                        }),
                        method: 'PUT',
                        data: data
                    });
                }
            };
        }]);
    }(angular, module));
})(angular);