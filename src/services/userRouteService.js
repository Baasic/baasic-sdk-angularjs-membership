/* globals module */

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
    module.service('baasicUserRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
}(angular, module));