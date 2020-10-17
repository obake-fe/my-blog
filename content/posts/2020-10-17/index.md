---
path: "/post-5"
cover: "./blocks.jpg"
date: "2020-10-17"
title: "GatsbyJS製ブログに「見出しにリンクを貼る機能」を追加する"
tags: ['GatsbyJS','JavaScript']
published: true
---

hタグの見出しにアンカーリンクを設置して、URL設定できるようにする。

## 手順

<br>

### ①プラグインをインストールする
 
`gatsby-remark-autolink-headers`プラグインをインストールする。<br>
https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/

```shell:title=zsh
❯  yarn add gatsby-remark-autolink-headers
```

<br>

### ②configファイルを設定する

`gatsby-config.js`を編集し、プラグイン設定を追加する。

※`gatsby-remark-prismjs`よりも上に`gatsby-remark-autolink-headers`を追記する。<br>
※option値を設定できる。ここではURL遷移後の見出し上部を、どのくらい空けるかについて設定している（OffsetY）<br>

```js:title=gatsby-config.js
{
  resolve: 'gatsby-transformer-remark',
  options: {
    plugins: [
      {
        resolve: 'gatsby-remark-images',
        options: {
          maxWidth: 750,
          quality: 90,
          linkImagesToOriginal: true,
        },
      },
      // 以下追記
      {
        resolve: `gatsby-remark-autolink-headers`,
        options: {
          offsetY: `16`
        }
      },
      // ここまで
      'gatsby-remark-prismjs-title',
      'gatsby-remark-prismjs',
    ],
  },
},
```

<br>

## 参考

- [Gatsbyを使ったブログ構築メモ その3 | GreenDiver.log](https://greendiver234.com/gatsby-blog-getting-started-3/)
- [gatsby-remark-autolink-headers の導入手順。GatsbyブログのHeadingタグにURLフラグメントを付ける - Nodachisoft](https://nodachisoft.com/common/jp/article/jp000022/)
