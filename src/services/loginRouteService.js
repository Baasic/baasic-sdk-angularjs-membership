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
    "use strict";
    module.service("baasicLoginRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                 /**
                 * Parses login route which can be expanded with additional options. Supported items are: 
                 * - `type` - A Login Type which defines how the user authenticates into the system. Supported values are: "oauth" and "forms".
                 * - `options` - Comma separated list of options used to setup authentication token with cookie session. Supported values are: "session" and "sliding".
                 * @method        
                 * @example baasicLoginRouteService.login.expand({options: 'sliding', type: 'oauth'});               
                 **/   			
                login: uriTemplateService.parse("login/{?embed,fields,options}"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/    				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));