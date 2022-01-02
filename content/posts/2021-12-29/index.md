---
path: "/post-12"
cover: "./blocks.jpg"
date: "2021-12-29"
title: "Webpack v5 で dotenv を使用しようとしたときの 「Can't resolve 'fs'」 エラーの解消方法"
tags: ['Webpack','dotenv']
published: true
---

`webpack.config.js`に以下を追記する。

webpack v4の場合
```js:title=webpack.config.js
module.export = {
  (省略)
  node: {
    fs: 'empty'
  }
  (省略)
};
```

webpack v5の場合
```js:title=webpack.config.js
module.export = {
  (省略)
  resolve: {
    fallback: {
      fs: false
    }
  },
  (省略)
};
```

webpack version5から `node.fs`の書き方が変わったらしい。

## 参考

- [Can't resolve 'fs' · Issue #233 · motdotla/dotenv · GitHub](https://github.com/motdotla/dotenv/issues/233)
- [To v5 from v4 \| webpack](https://webpack.js.org/migrate/5/)
