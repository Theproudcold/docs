import { DefaultTheme, defineConfig } from 'vitepress'
import { set_sidebar } from "../utils/auto-gen-sidebar";	// 改成自己的路径
// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: '/docs/',
  title: "Hypo的文档站",
  description: ".",
  cleanUrls:true,
  lastUpdated:true,
  markdown:{
    lineNumbers: true,
    math:true,
  },
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  themeConfig: {
    outlineTitle: "目录",
    outline: [2, 6],
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    // aside: "left", // 设置右侧侧边栏在左侧显示
    logo: 'public/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link:'/'},
      { text: '前端',activeMatch:'前端/', items:[{text:'uniapp',activeMatch:'前端/uniapp',link: '前端/uniapp/uniapp常见项目问题'}]},
      { text: '后端', items:[{text:'springboot',link: '后端/springboot/springboot常见项目问题'}] },
      { text: '算法', link:'算法/力扣p1' },
    ],
     // 上次更新样式
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'medium'
      }
    },
    
    search: {
      provider: 'local',
      options:{
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关文档',
            resetButtonTitle: '清除查询条件',
            footer:{
              selectText: '选择',
              navigateText: '切换',
            },
          },
        },
      },
    },
    sidebar: { "/前端":sidebarFrontEnd(),"/后端": sidebarRearEnd(),"/算法": sidebarAlgorithm()},//侧边栏
    footer: {
      copyright:"Copyright © 2023 Hypo"
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Theproudcold' }
    ],
  }
})
// 前端目录
function  sidebarFrontEnd(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '前端',
      collapsed: false,
      items: [
        {
          text:'uniapp',
          base:"/前端/uniapp",
          items:
          [
            {text:'uniapp常见项目问题',link: '/uniapp常见项目问题'}
          ]
        },
      ]
    },
  ]
}
// 后端目录
function sidebarRearEnd():DefaultTheme.SidebarItem[] {
  return [
    {
      text: '后端',
      collapsed: false,
      items: [
        {
          text:'springBoot',
          base:"/后端/springboot",
          items:
          [
            {text:'springboot常见项目问题',link: '/springboot常见项目问题'},
            {text:'项目打包部署流程',link: '/项目打包部署流程'}
          ]
        },
      ]
    },
  ]
}
// 算法目录
function sidebarAlgorithm():DefaultTheme.SidebarItem[] {
  return [
    {
      text: '算法',
      collapsed: false,
      base:"/算法",
      items: [
        {text:'力扣p1',link: '/力扣p1',},
        {text:'洛谷p8833',link: '/洛谷p8833',},
      ]
    },
  ]
}