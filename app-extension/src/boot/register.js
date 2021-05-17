import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-date-interval-table'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
