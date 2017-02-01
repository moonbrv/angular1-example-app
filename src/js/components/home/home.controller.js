import {NgTableParams} from 'ng-table'
// import debounce from 'lodash.debounce'

/**
 * this class is controller of <home> component
 *
 * @export
 * @class homeCtrl
 */
export default class homeCtrl {
  constructor(usersListService, $scope) {
    'ngInject'
    this.scope = $scope
    this.scope.usersListService = usersListService
    this.tableParams = new NgTableParams({
      count: 5
    },
    {
      counts: [5, 10, 15],
      dataset: this.scope.usersListService.users
    })

    // to catch changes in data and update table
    this.updated = this.tableParams.settings().dataset.length
    this.scope.$watch('usersListService.users', this.updateTable.bind(this))
  }

  /**
   * function check and update table data if need
   */
  updateTable() {
    if (this.tableParams.settings().dataset !== this.scope.usersListService.users) {
      this.tableParams.settings().dataset = this.scope.usersListService.users
      this.updated = true
      this.tableParams.reload()
    }
  }

  /**
   * function remove user with chosen id from data in service,
   * and sync table with data in service
   *
   * @param  {number} id
   */
  removeUser(id) {
    this.scope.usersListService.deleteUser(id)
    this.tableParams.settings().dataset = this.scope.usersListService.users
    this.tableParams.reload()
  }
}
