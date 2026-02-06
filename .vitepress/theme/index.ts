import { inBrowser } from 'vitepress'
import { h, onMounted, onUnmounted } from 'vue'
import type { Theme, EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import useVisitData from './hooks/useVisitData'
import WStatistics from './components/WStatistics.vue'
import WPostStats from './components/WPostStats.vue'
import { bindFancybox, destroyFancybox } from './components/ImgViewer'
import './styles/style.css'
import './styles/tailwind.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(WPostStats)
    })
  },
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    if (inBrowser) {
      router.onBeforeRouteChange = () => {
        destroyFancybox()
      }
      router.onAfterRouteChange = (to) => {
        bindFancybox()
        useVisitData()
      }
    }
    app.component('WStatistics', WStatistics)
  },
  setup() {
    onMounted(() => {
      bindFancybox()
      useVisitData()
    })
    onUnmounted(() => {
      destroyFancybox()
    })
  }
} satisfies Theme
