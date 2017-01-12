/* globals module */
/**
 * @module baasicRoleRouteService
 * @description Baasic Role Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Role Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicRoleRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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