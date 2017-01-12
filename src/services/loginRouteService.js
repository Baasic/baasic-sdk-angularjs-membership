/* globals module */
/**
 * @module baasicLoginRouteService
 * @description Baasic Login Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Login Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicLoginRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
                    post: uriTemplateService.parse('login/social/{provider}/{?embed,fields,options}'),
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