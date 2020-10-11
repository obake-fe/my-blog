---
path: "/post-3"
cover: "./blocks.jpg"
date: "2020-10-11"
title: "GatsbyJS製ブログに「コードタイトル設定機能」を追加する"
tags: ['GatsbyJS','JavaScript']
published: true
---

GatsbyJSにはコードのシンタックスハイライト機能は初めから存在している。<br>
が、コードタイトル設定機能は組み込まれていないため手動で追加が必要となる。

## 手順

<br>

### ①プラグインをインストールする
 
`gatsby-remark-prismjs-title`プラグインをインストールする。<br>
https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs-title/

※公式サイトでは`gatsby-remark-prismjs-add-title`と書かれているが、`gatsby-remark-prismjs-title`が正しいよう。前者をインストールしようとすると404エラーが起こる。

```shell:title=zsh
❯  yarn add gatsby-remark-prismjs-title
```

<br>

### ②configファイルを設定する

`gatsby-config.js`を編集し、プラグイン設定を追加する。

※コードブロックを使用する他のプラグインより前に定義する必要があるため、`gatsby-remark-prismjs`よりも上に`gatsby-remark-prismjs-title`を追記する。

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
      'gatsby-remark-prismjs-title',   // 記述追加
      'gatsby-remark-prismjs',
    ],
  },
},
```

<br>

### ③cssを設定する

`prism.js`内のcss設定にコードタイトルのcssを追加する。


```css:title=prism.js
/* 以下追記 */
.gatsby-code-title {
  display: block;
  position: relative;
  font-size: 0.8rem;
  width: 100%;
  left: 1rem;
}
.gatsby-code-title span {
  display: inline;
  position: relative;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  color: #fff;
  background: rgba(52,152,219,0.2);
  border-bottom-right-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
  padding: 3px;
  top: 1px;
}
```

好みに合わせてその他CSSも修正すれば機能は完成。

<br>

## マークダウンによる記述方法

`:title=表示するタイトル`の形式で設定する。

例）JavaScriptの言語設定でコードタイトルを`index.js`にしたい場合<br>
`js:title=index.js`

選択できる言語は以下公式ページ参照<br>
https://prismjs.com/#supported-languages
