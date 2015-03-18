/* globals module */
/**
 * @module baasicLoginRouteService
 * @description Baasic Login Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `baasicLoginService` uses `baasicLoginRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicLoginRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
                 * @example baasicLoginRouteService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/    				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));