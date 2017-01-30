/**
 * Export function that create and return new instace of class,
 * for <any unique-email></any> directive
 */

import UniqueEmail from './uniqueEmail.class.js'
/* @ngInject */
export default (usersListService) => new UniqueEmail(usersListService)
