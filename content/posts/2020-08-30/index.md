---
path: "/post-six"
cover: "./blocks.jpg"
date: "2020-08-30"
title: "Homebrewでzshをインストールする"
tags: ['zsh']
published: true
---

macOS Catalinaから標準シェルがzshになったが、デフォルトで入っているものは大抵古いバージョンなので、
homebrewで最新のバージョンのzshをインストールしたほうがよい。

## 手順

<br>

### ①Homebrewをインストールする
 
[macOS（またはLinux）用パッケージマネージャー — Homebrew](https://brew.sh/index_ja.html)

- Homebrewは`ruby`で書かれている。

<br>

### ②brew doctorコマンドでwarningを消す
`brew doctor`コマンドはHomebrewの問題をチェックしてくれるコマンド。
何も問題がない場合は、以下のように表示される。

```shell:title=zsh
❯  brew doctor
Your system is ready to brew.
```

[Homebrewの問題を確認する"brew doctor"コマンドとWarning対策集[macOS] - 一馬力のメモ帳](https://ichibariki.com/entry/2018/03/24/213524)

<br>

### ③zshのバージョンを確認する

<br>

・デフォルトでmacOSに入っているバージョンの確認

```shell:title=zsh
❯  /bin/zsh --version
zsh 5.7.1 (x86_64-apple-darwin19.0)
```

<br>

・homebrewでインストールできるzshのバージョンを確認
```shell:title=zsh
❯  brew info zsh
zsh: stable 5.8 (bottled), HEAD
```

homebrewのほうがバージョンが新しいので、こっちをインストールする。

<br>

### ④Homebrewでzshをインストールする

```shell:title=zsh
❯  brew install zsh --ignore-dependencies
```

`brew install --without-etcdir zsh`でインストールすると書いてあるサイトも多いが、`--without-etcdir`のオプションは無くなったようでエラーが起こる。(2020/08現在)

<br>

### ⑤zshをログインシェルに設定する

`echo $SHELL`コマンドで、現在のログインシェルを確認。

```shell:title=zsh
❯  echo $SHELL
/bin/zsh
```
`/usr/local/bin/zsh`ではない場合は、ログインシェルの設定が必要。

`/etc/shells`に今回`homebrew`でインストールしたzshのフルパスを記入する。

```shell:title=zsh
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
/usr/local/bin/zsh # ここに追記
```

`chsh`コマンドでログインシェルを切り替える。
```shell:title=zsh
❯  chsh -s /usr/local/bin/zsh
```

ターミナルを再起動して、再度ログインシェルを確認する。
```shell:title=zsh
❯  echo $SHELL
/usr/local/bin/zsh
```

ログインシェルの変更完了。

- Homebrewでインストールするパッケージは、`usr/local/Celler/`配下に格納されている。
- 同時に`/usr/loca/bin/`配下にシンボリックリンクが設定されるので、自動的にPATHが通ることになる。


## 参考
- [homebrewとは何者か。仕組みについて調べてみた - Qiita](https://qiita.com/omega999/items/6f65217b81ad3fffe7e6)
