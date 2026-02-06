/**
 * 网站访问量统计
 *
 * https://events.vercount.one/
 */
const useVisitData = () => {
  if (typeof document === 'undefined') return
  const script = document.createElement('script')
  script.defer = true
  script.async = true
  // 调用 Vercount 接口
  script.src = 'https://events.vercount.one/js'
  document.head.appendChild(script)
}

export default useVisitData
