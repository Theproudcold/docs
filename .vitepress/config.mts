import { defineConfig } from 'vitepress'
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
    // aside: "left", // 设置右侧侧边栏在左侧显示
    logo: 'public/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link:'/'},
      { text: '前端', items:[{text:'uniapp',link: 'article/前端/uniapp/uniapp常见项目问题'}]},
      { text: '后端', items:[{text:'SpringBoot',link: 'article/后端/Springboot/springboot常见项目问题'}] },
      { text: '算法', link:'article/算法/力扣p1' },
    ],
     // 上次更新样式
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'medium'
      }
    },
    // 上一页与下一页样式
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
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
    sidebar: { "/article": set_sidebar("article") },  //侧边栏
    footer: {
      copyright:"Copyright © 2023 Hypo"
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Theproudcold' }
    ],
  }
})
