/* globals module */
/**
 * @module baasicPasswordRecoveryRouteService 
 * @description Baasic Password Recovery Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Password Recovery Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicPasswordRecoveryRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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