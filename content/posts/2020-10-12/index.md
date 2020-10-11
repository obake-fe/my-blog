---
path: "/post-4"
cover: "./blocks.jpg"
date: "2020-10-12"
title: "GatsbyJS製ブログに「外部リンクを別タブで開く機能」を追加する"
tags: ['GatsbyJS','JavaScript']
published: true
---

外部ドメインリンクのaタグに`target="_blank"`をつけて、別タブで開く設定にする。

## 手順

<br>

### ①プラグインをインストールする
 
`gatsby-remark-external-links`プラグインをインストールする。<br>
https://www.gatsbyjs.com/plugins/gatsby-remark-external-links/

```shell:title=zsh
❯  yarn add gatsby-remark-external-links
```

<br>

### ②configファイルを設定する

`gatsby-config.js`を編集し、プラグイン設定を追加する。

※`gatsby-remark-prismjs`よりも下に`gatsby-remark-external-links`を追記する。<br>
※セキュリティ対策のため、optionに`rel="noopener noreferrer"`を付与する。<br>

参考：[target="_blank"には気をつけよう - Qiita](https://qiita.com/Apprentice_engineer/items/5db19a6d9bd4e7978aec)

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
      'gatsby-remark-prismjs-title',
      'gatsby-remark-prismjs',
      // 以下追記
      {
        resolve: `gatsby-remark-external-links`,
        options: {
          rel: "noopener noreferrer",
        }
      },
      // ここまで
    ],
  },
},
```

<br>

## 参考

- [Gatsbyを使ったブログ構築メモ その3 | GreenDiver.log](https://greendiver234.com/gatsby-blog-getting-started-3/)
