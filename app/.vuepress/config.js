module.exports = {
    base: "/LGTJ_YBLSS_WSYMYSJ_ZH/",
    host: "http://jiuyangzhenjing.github.io",
    title: '舒克张的个人博客',
    description: "我不想给自己打标签，也不想给自己划界线。",
    // theme: 'vuepress-theme-xx',
    // theme: '@vuepress/vue',
    dest: '/Users/lz/GitHub/jiuyangzhenjing.github.io/LGTJ_YBLSS_WSYMYSJ_ZH',
    themeConfig: {
        nav: [{
            text: '技术',
            link: '/knowledge/'
        }, {
            text: '创作与共享',
            link: '/read/'
        }],
        sidebar: {
            "/LTYBLSSFZGRSJWSYMYZH/": [{
                title: 'js',
                collapsable: false,
                children: [
                    ['FE/PACK', '打包工具'],
                    ['FE/Vue.js-1', 'Vue源码解析（1）'],
                    ['FE/Grid', 'grid布局'],
                    ['FE/PHP-array2string', 'PHP-将数组拼接成字符串'],
                    ['FE/PHP-timeFunction', 'php处理时间的函数-time/date'],
                    ['nodejs_statend', 'koa基础']
                ]
            }],
            "/read/": [{
                "title": "总结",
                children: []
            }]
        },
        sidebarDepth: 2,
        search: false,
        // sidebar: 'auto',
        lastUpdated: '编辑日期'
    }
}