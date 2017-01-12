/* globals module */

/**
 * @module baasicUserRouteService
 * @description Baasic User Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicUserRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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