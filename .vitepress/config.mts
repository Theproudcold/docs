import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "docs",
  base:"/docs",
  description: ".",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '我的',items:[
        {text: 'Examples', link: '/markdown-examples'}
      ] },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    //底部设置
    footer: {
      message: '@于',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
