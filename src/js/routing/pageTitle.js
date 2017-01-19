/**
 * pageTitle - function that run when app starts and add listener to rouning,
 * and change page title each time when state change
 *
 * @param  {object} $transitions ng
 * @param  {object} $state ng
 * @param  {object} $window ng
 */
export default function pageTitle($transitions, $state, $window) {
  'ngInject'
  const state = $state
  const window = $window
  $transitions.onSuccess({}, ($state, $window) => {
    window.document.title = state.current.data.title
  })
}
