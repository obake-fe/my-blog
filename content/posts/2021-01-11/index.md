---
path: "/post-10"
cover: "./blocks.jpg"
date: "2021-01-11"
title: "Reactのレンダリングプロセス"
tags: ['React']
published: true
---

Reactのレンダリングプロセスには2段階のステージがある。<br>
①Render ステージ<br>
②Commit ステージ

①のRenderステージは、仮想DOMの構築から差分検出処理（リコンシリエーション）までを含む。
②のCommitステージは、検出した差分を実DOMに反映する段階である。<br>

[React のライフサイクルメソッド図](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## ①Renderステージ

このステージで行われることは、

1. 仮想DOMの構築
2. 差分検出処理

である。<br>
RenderステージでレンダリングされているDOMについては、`React Developer Tools`の`Highlight updates when components render`機能で可視化することができる。

### ①-1 仮想DOMの構築

初回レンダリングではマウントが起こり、DOMを0から構築する。マウント後はpropsやstateの変更が起きたコンポーネント、及びその子コンポーネントのみ再レンダリングされる。（`createReactElement()`が実行される。）

ここでいうレンダリングとは、関数コンポーネントの本体（あるいはクラスコンポーネントの`render()`）が呼ばれることを指す。

この段階の無駄な再レンダリングを防ぐ方法を以下に示す。

#### 関数コンポーネントの場合

- [React.memo](https://ja.reactjs.org/docs/react-api.html#reactmemo)

```jsx:title=jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

>もしあるコンポーネントが同じ props を与えられたときに同じ結果をレンダーするなら、React はコンポーネントのレンダーをスキップし、最後のレンダー結果を再利用します。

React.memoを使用することで、受け取ったpropsが等価の場合にそのコンポーネントのレンダリングをスキップすることができる。

- [useCallback](https://ja.reactjs.org/docs/hooks-reference.html#usecallback)

```jsx:title=jsx
const memoizedCallback = useCallback(
  () => {doSomething(a, b);},
  [a, b],
);
```

React.memoと併用することで、コンポーネントの不要な再レンダリングをスキップできる。あるコンポーネントにアロー関数をpropsとして渡している場合は、renderのたびに新しい関数を生成するため、React.memoが意味をなさなくなる。useCallbackはアロー関数の再生成を防ぐことができる。

#### クラスコンポーネントの場合

- [ShouldComponentUpdate()](https://ja.reactjs.org/docs/react-component.html#shouldcomponentupdate)
  - props（とstate）の変更を検知し、変更が無いとみなされれば、そのコンポーネントのレンダリングをスキップすることができる。
  - デフォルトでは`ShouldComponentUpdate()`は常にtrueを返すため、常に再レンダリングが起こるようになっている。

- [PureComponent](https://ja.reactjs.org/docs/react-api.html#reactpurecomponent)
  - propsとstateをshallow compareし、変更が無いとみなされれば、そのコンポーネントのレンダリングをスキップすることができる。
  - ShouldComponentUpdateの代用となる。
  - [[React] Component と PureComponentの違い - Qiita](https://qiita.com/wifecooky/items/23fd1da041f707c1b78b)

### ①-2 差分検出処理

①-1で構築した仮想DOMと、実DOMの差分を検出する。<br>
このときkey値が同じDOMは差分が無いとみなすことができ、後の実DOM構築の処理を少なくすることができる。<br>
詳しくはReact公式の[差分検出処理](https://ja.reactjs.org/docs/reconciliation.html)を参照。

## ②Commitステージ

①-2で検出した差分を実DOMに反映する段階である。
このとき描画されるDOMは、Chrome devtoolsの`rendering > paintflashing`で確認することができる。

## 参考

- [Reactのレンダリングに関する完全ガイド - Qiita](https://qiita.com/hellokenta/items/6b795501a0a8921bb6b5)
- [React.memo / useCallback / useMemo の使い方、使い所を理解してパフォーマンス最適化をする - Qiita](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2)
- [リアルな DOM はなぜ遅いのか](https://blog.dodgson.org/b/2014/12/11/why-is-real-dom-slow/)
- [React に優しい僕でありたい - Qiita](https://qiita.com/nabeliwo/items/de0bc076ed7105dda2ca)
- [React製のSPAのパフォーマンスチューニング実例](https://recruit-tech.co.jp/blog/2018/09/19/react_spa_performance_tuning/)
