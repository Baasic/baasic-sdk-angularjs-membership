/* globals module */
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
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/  				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));