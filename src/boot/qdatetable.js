import QDateTable from '../component/QDateTable'

export default ({ Vue }) => {
  Vue.component('q-datetable', QDateTable),
  Vue.component('q-datetable-edit', QDateTableEdit)
}