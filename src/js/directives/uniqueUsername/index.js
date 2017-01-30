/**
 * Export function that create and return new instace of class,
 * for <any unique-username></any> directive
 */

import UniqueEmail from './uniqueUsername.class'
/* @ngInject */
export default (usersListService) => new UniqueEmail(usersListService)
