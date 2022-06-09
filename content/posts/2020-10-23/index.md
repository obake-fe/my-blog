---
path: "/post-8"
cover: "./blocks.jpg"
date: "2020-10-23"
title: "「create-react-app」+ 「TypeScript」環境で絶対パスのaliasを指定する"
tags: ['JavaScript','React','TypeScript','Webpack']
published: true
---

import文を相対パスで記載せず、絶対パスで記載するやり方。


## 手順

<br>

### ①パッケージをインストールする

webpackの設定を変更するためのパッケージ、`react-app-rewired`をインストールする。<br>
https://github.com/timarney/react-app-rewired

```shell:title=zsh
❯  yarn add react-app-rewired -D
```

<br>

### ②package.jsonを編集する

先程インストールしたパッケージに合わせて、package.json内のデフォルトのscript部分を書き換える。

```js:title=package.json
"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test",
"eject": "react-app-rewired eject",
```

<br>

### ③webpackの設定ファイルを作成する

ルート階層に`config-overrides.js`を作成し、alias設定の記述を書き込む。

```js:title=config-overrides.js
const path = require('path')

module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,

      // 以下に指定したいalias名と、対応パスを記述
      '@js': path.resolve(__dirname, './src/js'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
    }
  };

  return config;
}
```

<br>

### ④tsconfig.jsonを編集する

create-react-app環境だと`tsconfig.json`で`paths`を指定できないため、（`react-scripts start`した時に`paths`オプションが自動で消されてしまう）
`compilerOptions`の記述の前に、extendsの記述を追加し、別ファイルで設定を行う。

```js:title=tsconfig.json
{
  "extends": "./tsconfig.paths.json",
    "compilerOptions": {
  // 省略
}
```

<br>

### ⑤tsconfig.paths.jsonを作成する

`config-overrides.js`の設定に対応する`paths`を記述する。

```js:title=tsconfig.paths.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@js/*": ["./src/js/*"],
      "@data/*": ["./src/data/*"],
      "@styles/*": ["./src/styles/*"],
    }
  }
}
```

これで`src`配下のファイルでimport文を書くとき、絶対パスaliasを使用することができる。

```js:title=js
// こんな長いパス指定も
import hoge from "../../../js/component/hoge";

// aliasでスッキリ
import hoge from "@js/component/hoge";
```

<br>

## 参考

- [Absolute paths with Create React App + Typescript (without ejecting) | by Gustavo Graeff | Aug, 2020 | Medium](https://medium.com/@gustavograeff1998/absolute-imports-with-create-react-app-typescript-e87878cab65b)
- [VS Code + create-react-app v3でtsconfig.jsonのpathsを使用する - Qiita](https://qiita.com/nbkn/items/32a7de99a594ffcd0d9e)
- [react-create-app + TypeScriptでwebpackのaliasを設定する方法 | MK Dev](https://mk-engineer.com/posts/react-create-app-typescript-webpack-alias)
