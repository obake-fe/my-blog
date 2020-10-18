---
path: "/post-6"
cover: "./blocks.jpg"
date: "2020-10-18"
title: "Gitコマンド「branch]「fetch」よく使うオプションまとめ"
tags: ['Git']
published: true
---

Gitのブランチに関するコマンド`git branch`と、リモートリポジトリのデータを取得するGitコマンド`git fetch`について。

## git branch

<br>

### ブランチ一覧を表示する

ローカルリポジトリに存在するブランチリストを表示する。`*`マークがついているブランチが現在チェックアウトしているブランチとなる。

```shell:title=zsh
❯  git branch
* master
  test
```

`-a`オプションをつけることで、リモート追跡ブランチを含んだブランチ一覧を表示する。

```shell:title=zsh
❯  git branch -a
* master
  test
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
  remotes/origin/test
```

※`remotes`とはリモート追跡ブランチのこと。<br>
参考：[Git で「追跡ブランチ」って言うのやめましょう - Qiita](https://qiita.com/uasi/items/69368c17c79e99aaddbf)

※`remotes/origin/HEAD -> origin/master`とはリモート追跡リポジトリのデフォルトのブランチが`origin/master`になっているという意味。
例えば、`git checkout -b test origin`は、`git checkout -b test origin/master`と同じ意味となる。

<br>

### ブランチを作成する

`git branch <任意のブランチ名>`で、現在のHEADを起点にして、指定した名前のローカルブランチを作成する。

```shell:title=developという名前のブランチを作成する場合
❯  git branch develop
```

同時にチェックアウトも行う場合は、`git checkout -b <任意のブランチ名>`となる。

```shell:title=developという名前のブランチを作成するして、チェックアウトも行う場合
❯  git checkout -b develop
```

<br>

### ブランチを削除する

`-d`オプションで、現在チェックアウトしているブランチに**マージされている**ローカルブランチを削除できる。

```shell:title=developブランチを削除する場合
❯  git branch -d develop
```

`--merged`オプションで、現在チェックアウトしているブランチにマージされているローカルブランチを確認できる。

```shell:title=zsh
❯  git branch --merged
* master
  develop  ## developブランチはmasterにmergeされているので-dオプションで削除できる
```

現在チェックアウトしているブランチに**マージされていない**ローカルブランチを削除する場合は`-D`オプションを使う。

```shell:title=featureブランチを削除する場合
❯  git branch -D feature
```

リモート追跡ブランチを削除する場合は、`-dr`オプションをつける。

```shell:title=developブランチのリモート追跡ブランチを削除する場合
❯  git branch -dr origin/develop
```

※リモートリポジトリのブランチを削除する場合は、`git push --delete origin <ブランチ名>`となる。

```shell:title=リモートリポジトリのfeatureブランチを削除する場合
❯  git push --delete origin feature
```

<br>

## git fetch

<br>

### リモートリポジトリの全ての状態を取得

リモートリポジトリの最新の状態を、ローカルリポジトリの**リモート追跡ブランチ**に同期する。

```shell:title=zsh
❯  git fetch
```

引数を省略した場合、リモートリポジトリのすべての状態を取得する。

>リポジトリをクローンしたときには、リモートリポジトリに対して自動的に`origin`という名前がつけられます。

<br>

※引用：[Git - リモートでの作業](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E5%9F%BA%E6%9C%AC-%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88%E3%81%A7%E3%81%AE%E4%BD%9C%E6%A5%AD#r_remote_repos)

なため、その場合は以下2つのコマンド内容は同じである。

```shell:title=zsh
❯  git fetch

❯  git fetch --all

❯  git fetch origin
```

<br>

### リモートリポジトリの指定ブランチの状態のみを取得

`git fetch <リモートリポジトリ名> <リモートリポジトリブランチ名>`と指定することで、指定ブランチの状態のみを取得することができる。

```shell:title=リモートリポジトリ（origin）のmasterブランチのみをfetchする場合
❯  git fetch origin master
```

<br>

### 不要なリモート追跡ブランチを削除する

`git branch -dr`コマンドでリモート追跡ブランチを削除できるが、`git fetch --prune`コマンドを用いることによって、リモートリポジトリで削除されたブランチに対応する追跡ブランチをまとめて削除することができる。

```shell:title=リモートリポジトリ（origin）で削除されたブランチに対応する追跡ブランチを削除する場合
❯  git fetch --prune

❯  git fetch -p  ## 省略形
```

<br>

## 参考

- [Git でローカルとリモート両方のブランチを削除する方法 - yu8mada](https://yu8mada.com/2018/08/13/how-to-delete-both-local-and-remote-branches-in-git/)
- [Git の Fetch コマンドの使い方 - yu8mada](https://yu8mada.com/2018/06/07/how-to-use-git-s-fetch-command/)
- [Gitでローカルブランチ・リモートブランチを削除する方法 | WWWクリエイターズ](https://www-creators.com/archives/1062)
- [git branch コマンド - Qiita](https://qiita.com/chihiro/items/e178e45a7fd5a2fb4599)
- [いまさらだけどGitを基本から分かりやすくまとめてみた - Qiita](https://qiita.com/gold-kou/items/7f6a3b46e2781b0dd4a0)
