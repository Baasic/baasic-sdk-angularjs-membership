/* globals module */
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
    module.service('baasicRoleRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
}(angular, module));