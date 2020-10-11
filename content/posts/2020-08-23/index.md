---
path: "/post-1"
cover: "./blocks.jpg"
date: "2020-08-23"
title: "[].slice.call()とは"
tags: ['JavaScript']
published: true
---
どうやら配列風オブジェクトを配列に変換する記法らしい。

```JS:title=JS
//配列風オブジェクト
const elms = document.querySelectorAll('.elm');

//配列に変換
const elmArr = [].slice.call(elms);

//配列なのでsliceメソッドを使える
elmArr.slice();
```

## 解説

<br>

### 🐳&nbsp;NodeList
`Document.querySelectorAll()`メソッドは、配列風オブジェクトである`NodeList`を取得する。<br>
NodeListはArrayオブジェクトを継承していないので、`slice`や`push`などの`Array.prototype`が持つメソッドを使用できない。

```JS:title=JS
//配列風オブジェクト
const elms = document.querySelectorAll('.elm');

//配列ではないのでsliceメソッドを使えない
elms.slice();  // エラーが起こる
```

**そのため、配列風オブジェクトでArray.prototypeメソッドを使用したい場合は、配列に変換する必要がある。**

<br>

※ちなみに`length`プロパティは使用できる。（NodeListにもlengthプロパティが存在するため）<br>
というか配列風オブジェクトはlengthを使えることが定義の1つらしい。

```JS:title=JS
// NodeListに含まれるノードの数を取得
console.log(elms.length);  
```

[NodeList - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/NodeList)
&nbsp;&nbsp;👻&nbsp;&nbsp;>&nbsp;forEach()とかも使えるのか..

<br>

### 🐳&nbsp;[].slice

`Array.prototype.slice()`メソッドは、配列を切り抜くメソッド。<br>
引数に何も指定しない場合、配列をshallow copyすることができる。

```js:title=JS
const arr = ['hoge', 'fuga', 'piyo']

const sliceArr1 = arr.slice(2);
const sliceArr2 = arr.slice(1,3);
const copyArr = arr.slice();

console.log(sliceArr1);  // ['piyo']
console.log(sliceArr2);  // ['fuga', 'piyo']
console.log(copyArr);    // ['hoge', 'fuga', 'piyo']
```

[Array.prototype.slice() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

`[].slice()`と指定した場合は、空の配列をコピーすることになる。<br>
が、ここでそれは重要ではなくて、**「slice()の引数に何も指定しない場合、配列をshallow copyすることができる。」**だけ覚えれば良いと思われ。

<br>

### 🐳&nbsp;call()

`Function.prototype.call()`メソッドは、、説明が難しい。
MDNによると、
>call() はあるオブジェクトに所属する関数やメソッドを、別なオブジェクトに割り当てて呼び出すことができます。

つまり最初の例の場合、`Array.prototype`に所属する`slice()`メソッドを、引数に指定した配列風オブジェクトの`elms`に割り当てて呼び出している。

```JS:title=JS
//配列風オブジェクト
const elms = document.querySelectorAll('.elm');

//そのままではslice()を使えないが、
elms.slice();  // エラー

//call()を使用して、配列風オブジェクトelmsを、配列として呼び出すことでslice()を使える
const elmArr = [].slice.call(elms);
```

よって実質`elms.slice()`が実行されることとなる。<br>
引数なしのslice()メソッドは、配列のshallow copyと同義のため、elms（配列風オブジェクト）の中身をそのままコピーした**配列**が生成される。**→目的の達成**&nbsp;🎉

#### ■補足<br>
call()は第2引数以降に、呼び出し先の関数に渡される引数を指定することができる。<br>
つまり、この場合でslice()に引数を渡したい場合は、

```js:title=JS
// 配列風オブジェクトを任意の形にsliceして配列に変換
const sliceElmArr = [].slice.call(elms, 1, 3);
```

のような形で指定ができる。

<br>

### 🐳&nbsp;ES6以降では

ES6記法が使えるなら`Array.from()`やスプレッド演算子を使えばおk

```JS:title=JS
//配列風オブジェクト
const elms = document.querySelectorAll('.elm');

//配列に変換
const elmArr1 = Array.from(elms);
const elmArr2 = [...elms];
```

<br>

### 🐳&nbsp;おまけ知見
<br>

#### 🐠&nbsp;arguments

配列風オブジェクトの1つ。<br>
すべての関数内（アロー関数を除く）で利用可能なローカル変数であり、関数の引数を参照することができる。
[arguments - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/arguments)

```js:title=JS
const func = function(arg1, arg2) {
  console.log(arguments); // [1, 2]
};

func1(1, 2);
```

#### 🐠&nbsp;[].sliceは省略形
空配列[]を使用するのは省略形の書き方。slice()を使いたいだけなので以下の書き方でも良い。

```js:title=JS
const elmArr = Array.prototype.slice.call(elms);
```

<br>

## 🐳&nbsp;参考
- [JavaScriptの配列風オブジェクトと「[].slice.call()」による配列変換について - このすみ技術メモ](https://www.konosumi.net/entry/2019/05/26/220321)
- [Array.prototype.slice.call(arguments)とは - console.lealog();](https://lealog.hateblo.jp/entry/2014/02/07/012014)
- [JavaScript bind,call,apply入門！ - Qiita](https://qiita.com/39_isao/items/c00a200b158ba057363f)
- [Array.prototype.slice() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [Function.prototype.call() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [arguments - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/arguments)
