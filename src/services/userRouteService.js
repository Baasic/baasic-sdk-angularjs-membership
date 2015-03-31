/* globals module */

/**
 * @module baasicUserRouteService
 * @description Baasic User Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `baasicUserService` uses `baasicUserRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicUserRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                /**
                * Parses user exists route; URI template should be expanded with the username whose availability you'd like to check.                
                * @method        
                * @example baasicUserRouteService.exists.expand({userName: "<username-to-check>"});               
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
                * @example baasicUserRouteService.find.expand({searchQuery: "<search-phrase>"});               
                **/  				
                find: uriTemplateService.parse('users/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                * Parses get user route which must be expanded with the userName of the previously created user resource in the system. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicUserRouteService.get.expand({userName: "<username-to-fetch>"});               
                **/   					
                get: uriTemplateService.parse('users/{userName}/{?embed,fields}'),
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example baasicUserRouteService.parse("route/{?embed,fields,options}").expand({embed: "<embedded-resource>"});
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
                * @example baasicUserRouteService.changePassword.expand({userName: "<username>"});              
                **/ 				
                changePassword: uriTemplateService.parse('users/{userName}/change-password'),
            };
        }]);
}(angular, module));