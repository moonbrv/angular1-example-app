/**
 * this class is controller of <home> component
 *
 * @export
 * @class homeCtrl
 */

export default class homeCtrl {
  constructor(usersListService) {
    'ngInject'
    this.srvc = usersListService
    this.sortType = 'name'
    this.sortReverse = false
  }

  /**
   * function that decide order of sorting of column
   * if it first click on column - order of sorting will not reverse and set new OrderBy parametr
   * @param  {string} typeho
   */
  setOrder(type) {
    if (this.sortType === type) {
      this.sortReverse = !this.sortReverse
    } else {
      this.sortReverse = false
      this.sortType = type
    }
  }

  /**
   * function decide wich class aply to element decided by sorting order
   * @returns {string} class for display direction of sorting
   */
  setIcon() {
    return !this.sortReverse ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-top'
  }

  /**
   * function decide visibility of sort icon in column
   * @param  {string} type
   * @returns {boolean}
   */
  setShow(type) {
    return this.sortType === type
  }
}
