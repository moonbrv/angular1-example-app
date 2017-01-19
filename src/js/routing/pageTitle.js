export default function pageTitle($transitions, $state, $window) {
  'ngInject'
  const state = $state
  const window = $window
  $transitions.onSuccess({}, ($state, $window) => {
    window.document.title = state.current.data.title
  })
}
