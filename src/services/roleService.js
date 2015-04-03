/* globals module */
/**
 * @module baasicRoleService
 * @description Baasic Role Service provides an easy way to consume Baasic application user role features.
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicRoleService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicRoleRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, roleRouteService) {
            return {
                /**
                * Provides direct access to `baasicRoleRouteService`.
                * @method        
                * @example baasicRoleService.routeService.get.expand(expandObject);
                **/             
                routeService: roleRouteService,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of role resources matching the given criteria.
                 * @method        
                 * @example 
baasicRoleService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<name>',
  orderDirection : '<asc|desc>',
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/  					
                find: function (options) {
                    return baasicApiHttp.get(roleRouteService.find.expand(baasicApiService.findParams(options)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified role resource.
                 * @method        
                 * @example 
baasicRoleService.get('<role-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                get: function (id, options) {
                    return baasicApiHttp.get(roleRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                 /**
                 * Returns a promise that is resolved once the create action has been performed, this action creates a role.
                 * @method        
                 * @example 
baasicRoleService.create({
  description : '<description>',
  name : '<name>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                create: function (data) {
                    return baasicApiHttp.post(roleRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update role action has been performed, this action updates a role. This function doesn't use `baasicRoleRouteService` for obtaining route templates, however `update` route can be obtained from role resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(role);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
role.name = '<new-name>';
baasicRoleService.update(role)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});

				**/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the remove role action has been performed. This action removes a role from the system, if completed successfully. This function doesn't use `baasicRoleRouteService` for obtaining route templates, however `remove` route can be obtained from role resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(role);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicRoleService.remove(role)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/				
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
}(angular, module));