---
path: "/post-7"
cover: "./blocks.jpg"
date: "2020-10-20"
title: "「Array.prototype.filter()」メソッドで配列のfalsyな要素を除去する"
tags: ['JavaScript','ES6']
published: true
---

filter()メソッドを使うことで、配列のfalsyな要素（0, null, undefined, false）を除去することができる。

```js:title=JS
const array = [0, 1, null, 3, undefined, 5, false, 7, '', 9]
const hoge = array.filter(num => num)
console.log(hoge) // [ 1, 3, 5, 7, 9]
```

## 解説

>`Array.prototype.filter()`は、与えられた`callback`関数を配列の各要素に対して一度ずつ呼び出し、`callback`が`true`と評価される値を返したすべての要素からなる新しい配列を生成します。<br>

引用：[Array.prototype.filter() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

通常は、以下のようにcallback関数に条件式を定義するが、要素をそのまま`return`することによって、`true`に評価される要素だけの配列を作ることができる。

```js:title=JS
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

<br>

## 参考

- [JavaScriptにおける配列の空要素除去filterパターン - Qiita](https://qiita.com/akameco/items/1636e0448e81e17e3646)
