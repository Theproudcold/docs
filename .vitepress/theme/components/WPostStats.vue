<template>
  <div class="weiz-title-meta">
    <div class="tags">
      <div class="created" title="发表于">
        <!-- SVG icon for calendar/created -->
        <svg class="weiz-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <span>发表于 {{ firstCommit }}</span>
      </div>
      <div class="updated" title="更新于">
        <!-- SVG icon for updated -->
        <svg class="weiz-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
        <span>更新于 {{ lastUpdated }}</span>
      </div>
      <div class="word" title="字数">
        <!-- SVG icon for file/word count -->
        <svg class="weiz-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="6" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span>字数 {{ wordCount }}</span>
      </div>
      <div class="reader" title="阅读量">
         <!-- SVG icon for users/views -->
         <svg class="weiz-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        <span>阅读量 {{ pv }}<span id="busuanzi_value_page_pv" style="display: none" /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted, watch } from 'vue'
import { countWord, countTransK, formatDate } from '../../utils/tools'

const { frontmatter, page } = useData()

const wordCount = ref('')
const firstCommit = ref('')
const lastUpdated = ref('')
const pv = ref('')

let timeoutPV: number | undefined = undefined

const getPV = () => {
  // Reset PV when page changes
  pv.value = ''
  
  if (timeoutPV) clearTimeout(timeoutPV)
  timeoutPV = window.setTimeout(() => {
    const $PV = document.querySelector('#busuanzi_value_page_pv')
    const text = $PV?.innerHTML
    if ($PV && text) {
      pv.value = countTransK(parseInt(text)) as string
    } else {
      getPV()
    }
  }, 500)
}

const updateStats = () => {
  // Use server-side injected data if available
  const date = frontmatter.value.date // injected by transformPageData
  if (date) {
    firstCommit.value = formatDate(new Date(date)).replace(/\//g, '-')
  } else if (frontmatter.value.firstCommit) {
    // Fallback manual frontmatter
     firstCommit.value = formatDate(new Date(frontmatter.value.firstCommit)).replace(/\//g, '-')
  } else {
    firstCommit.value = 'Unknown'
  }
  
  if (frontmatter.value.lastUpdated || page.value.lastUpdated) {
     lastUpdated.value = formatDate(new Date(frontmatter.value.lastUpdated || page.value.lastUpdated!)).replace(/\//g, '-')
  } else {
     lastUpdated.value = 'Unknown'
  }

  // Use server-side injected word count
  if (frontmatter.value.wordCount !== undefined) {
    wordCount.value = countTransK(frontmatter.value.wordCount) as string
  } else {
     // Fallback to client-side counting if needed
    const docDomContainer = window.document.querySelector('#VPContent')
    const words = docDomContainer?.querySelector('.content-container .main')?.textContent || ''
    wordCount.value = countTransK(countWord(words)) as string
  }
}

// Watch for route changes (frontmatter changes)
watch(frontmatter, () => {
  updateStats()
  getPV()
})


onMounted(() => {
  updateStats()
  getPV()
})
</script>

<style scoped>
.weiz-title-meta {
  margin-bottom: 24px;
}
.weiz-title-meta .tags {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 16px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  line-height: 18px;
  word-break: keep-all;
}
.weiz-title-meta .tags > div {
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-right: 12px;
}
.weiz-title-meta .tags > div:last-child {
  margin-right: 0;
}
.weiz-icon {
  margin-right: 4px;
  width: 14px;
  height: 14px;
}

@media (min-width: 768px) {
  .weiz-title-meta .tags > div {
    margin-right: 16px;
  }
}
</style>
