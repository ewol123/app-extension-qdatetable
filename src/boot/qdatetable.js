import QDateTable from '../component/QDateTable';
import QDateTableEdit from "../component/QDateTableEdit";

export default ({ Vue }) => {
  Vue.component('q-datetable', QDateTable),
  Vue.component('q-datetable-edit', QDateTableEdit)
}