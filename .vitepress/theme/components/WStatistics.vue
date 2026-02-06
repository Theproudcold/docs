<template>
  <div class="statistics">
    <div class="title-wrapper">
      <div class="title">
        <span>访问统计</span>
        <span class="title-hover">访问统计</span>
      </div>
    </div>
    <div class="statistics-main">
      <div class="statistics-wrapper">
        <span class="statistics-title">总访问量</span>
        <span class="statistics-pv" id="pv">{{ pv }}</span>
      </div>
      <div class="chart pv-wrapper">
        <div class="pv-num" id="pvProgress" style="width: 70%"></div>
      </div>
      <div class="statistics-wrapper">
        <span class="statistics-title">独立访客</span>
        <span class="statistics-uv" id="uv">{{ uv }}</span>
      </div>
      <div class="chart uv-wrapper">
        <div class="uv-num" id="uvProgress" style="width: 45%"></div>
      </div>
    </div>
    <span id="busuanzi_value_site_pv" style="display: none" />
    <span id="busuanzi_value_site_uv" style="display: none" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getSessionStorage, setSessionStorage, numberWithCommas } from '../../utils/tools'

let sessionPv = getSessionStorage('pv')
let sessionUv = getSessionStorage('uv')

const pv = ref<string | number>(sessionPv ? numberWithCommas(parseInt(sessionPv)) : 'loading')
const uv = ref<string | number>(sessionUv ? numberWithCommas(parseInt(sessionUv)) : 'loading')

let timeoutPV: number |  undefined = undefined
const getPV = () => {
  if (timeoutPV) clearTimeout(timeoutPV)
  timeoutPV = window.setTimeout(() => {
    const $PV = document.querySelector('#busuanzi_value_site_pv')
    const text = $PV?.innerHTML
    if ($PV && text) {
      const start = getSessionStorage('pv') || '1000'
      pv.value = numberWithCommas(parseInt(text))
      setSessionStorage('pv', text)
      // 调用封装的函数
      animateNumberAndProgressBar({
        counterSelector: '#pv',
        fillBarSelector: '#pvProgress',
        start: parseFloat(start),
        end: parseInt(text),
        totalDuration: 2000,
        minPercentage: 5,
        targetPercentage: 75
      })
    } else {
      getPV()
    }
  }, 500)
}

let timeoutUV: number | undefined = undefined
const getUV = () => {
  if (timeoutUV) clearTimeout(timeoutUV)
  timeoutUV = window.setTimeout(() => {
    const $UV = document.querySelector('#busuanzi_value_site_uv')
    const text = $UV?.innerHTML
    if ($UV && text) {
      const start = getSessionStorage('uv') || '1000'
      uv.value = numberWithCommas(parseInt(text))
      setSessionStorage('uv', text)
      // 调用封装的函数
      animateNumberAndProgressBar({
        counterSelector: '#uv',
        fillBarSelector: '#uvProgress',
        start: parseFloat(start),
        end: parseInt(text),
        totalDuration: 2000,
        minPercentage: 5,
        targetPercentage: 50
      })
    } else {
      getUV()
    }
  }, 500)
}

// 统计数字动画
const animateNumberAndProgressBar = ({
  counterSelector,
  fillBarSelector,
  start = 0,
  end,
  totalDuration = 2000,
  minPercentage = 5,
  targetPercentage = 75
}: any) => {
  // 如果开始和结束的数字相同，直接返回
  if (start == end) {
    return
  }
  // 调整进度条起始位置，要基本符合进度条的长度
  const maxNum = (end * 100) / targetPercentage
  let startPercentage = (start / maxNum) * 100

  const counterElement = document.querySelector(counterSelector)
  const fillBarElement = document.querySelector(fillBarSelector) as HTMLElement
  
  if (!counterElement || !fillBarElement) return

  let startTime: number | null = null
  const totalSteps = end - start

  function animateCounter(timestamp: number) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - (startTime ?? timestamp)
    const progress = Math.min(elapsed / totalDuration, 1)
    const currentNumber = Math.floor(start + progress * totalSteps)

    let stepPercentage = progress * (targetPercentage - startPercentage)
    // 保证肉眼能看到至少5%的变化
    if (targetPercentage - startPercentage < minPercentage) {
      stepPercentage = progress * minPercentage
      startPercentage = targetPercentage - minPercentage
    }

    const currentProgress = startPercentage + stepPercentage

    if (counterElement) counterElement.textContent = numberWithCommas(currentNumber)
    if (fillBarElement) {
        fillBarElement.style.width = currentProgress + '%'
        if (fillBarElement.style.display !== 'block') {
          fillBarElement.style.display = 'block'
        }
    }

    if (progress < 1) {
      requestAnimationFrame(animateCounter)
    }
  }

  fillBarElement.style.width = startPercentage + '%'
  fillBarElement.style.display = 'block'
  requestAnimationFrame(animateCounter)
}

onMounted(() => {
  getUV()
  getPV()
})
</script>

<style scoped>
.statistics {
  width: 100%;
  display: inline-block;
  border-radius: 16px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 500;
  padding: 24px;
  box-shadow: 0 1px 2px 0 rgba(25, 26, 28, 0.05);
  transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s;
}

.statistics:hover {
  color: var(--vp-c-text-1);
  transform: scale(1.03);
  box-shadow: 0 10px 15px -3px rgba(25, 26, 28, 0.1), 0 4px 6px -4px rgba(25, 26, 28, 0.1);
}

.statistics:hover .title .title-hover {
  width: 100%;
}


.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.title {
  font-size: 16px;
  line-height: 1.5;
  font-weight: 600;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.title .title-hover {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  color: #409eff;
  transition: width 0.4s ease-in-out;
}

.statistics-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.chart {
  height: 8px;
  border-radius: 8px;
  background-color: var(--vp-c-gray-3);
}

.chart > div {
  height: 100%;
  border-radius: 8px;
  background-color: #409eff;
}

.pv-wrapper {
  margin-bottom: 16px;
}

.statistics-title + span {
  font-size: 16px;
  line-height: 1.5;
  font-weight: 600;
}
</style>
