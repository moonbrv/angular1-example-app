import {NgTableParams} from 'ng-table'

/**
 * this class is controller of <home> component
 *
 * @export
 * @class homeCtrl
 */
export default class homeCtrl {
  constructor(usersListService, $timeout) {
    'ngInject'
    this.usersListService = usersListService
    this.tableParams = new NgTableParams({
      count: 5
    },
    {
      counts: [5, 10, 15],
      dataset: this.usersListService.users
    })
    // to catch changes in data and update table
    this.updated = !!this.tableParams.settings().dataset.length
    this.timeout = $timeout
    this.timeout(() => {
      if (this.tableParams.settings().dataset !== this.usersListService.users) {
        this.tableParams.settings().dataset = this.usersListService.users
        this.tableParams.reload()
        this.updated = true
      }
    }, 2000)
  }

  /**
   * function remove user with chosen id from data in service,
   * and sync table with data in service
   *
   * @param  {number} id
   */
  removeUser(id) {
    this.usersListService.deleteUser(id)
    this.tableParams.settings().dataset = this.usersListService.users
    this.tableParams.reload()
  }
}
