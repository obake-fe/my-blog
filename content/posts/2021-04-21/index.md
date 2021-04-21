---
path: "/post-11"
cover: "./blocks.jpg"
date: "2021-04-21"
title: "【JavaScript】typeofの違い【TypeScript】"
tags: ['JavaScript','React']
published: true
---

JS、TSで開発する際に、`typeof`の使い方に混乱したのでまとめる。<br>
①typeof 演算子<br>
②型クエリー

## ①typeof 演算子

いわゆるJavaScriptのtypeof。与えられたオペランドの型を表す文字列を返す。
[typeof - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof)

```js:title=js
console.log(typeof "hoge");
// expected output: "string"

console.log(typeof true);
// expected output: "boolean"
```

### typeof演算子の返り値一覧

|型  |返り値  |
|---|---|
|Undefined  |"undefined"  |
|Null  |"object"  |
|真偽値  |"boolean"  |
|数値  |	"number"  |
|文字列  |"string"  |
|Function オブジェクト  |"function"  |
|その他のオブジェクト  |	"object"  |
|シンボル  |"symbol"  |
|BigInt  |"bigint"  |

- `typeof null === 'object';`となることに注意

### 使用例
TypeScriptファイルで型ガードに使用されることが多い。

```ts:title=ts
const fnc = (arg: number | string) => {
  const x = arg; // const x: string | number
  if (typeof arg === "number") {
    const y = arg; // const y: number
  } else {
    const z = arg; // const z: string
  }
};
```

## ②型クエリー

いわゆるTypeScriptのtypeof。宣言済み変数の型を取得できる。
[typescriptlang.org](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html#the-typeof-type-operator)

```ts:title=ts
let hoge: string = "";
let fuga: typeof hoge;
fuga = "fuga"
fuga = 0  // Error
```

### 使用例
keyofキーワードと併用することで、オブジェクトプロパティの共用体型を取得できる。

```ts:title=ts
const obj = {
  hoge: "hoge",
  fuga: "fuga"
}

type objKey = keyof typeof obj  // "hoge" | "fuga"
```

型クエリーにおいては「typeof」の後に指定できる式は限定されており、変数、またはドット「.」による参照を行っているプロパティー(メンバー)に限られる。

## 参考

- [typeof - TypeScriptキーワード一覧](https://www.pg-fl.jp/program/ts/kw-ref/typeof.htm)
- [TypeScript の型ガードの注意点と解決法](https://numb86-tech.hatenablog.com/entry/2020/06/30/154343)
