# Scratch-Last-Login

## Overview

Scratchで最終ログイン時間を簡単に自動表示してくれるシステムです。

## 対応環境

対応している環境は、Chromium搭載のデスクトップブラウザのみです。  
また、組織によって管理されている場合はインストールできない可能性があります。

## 導入方法

1. [こちら](https://github.com/P-nutsK/Scratch-Last-login/archive/refs/heads/master.zip)のリンクからファイルをダウンロードします。
2. ダウンロードしたファイルをダブルクリックして解凍します。
3. お使いのブラウザでchrome://extensions/ を開き、右上にあるデベロッパーツールのマークをオンにします(元々オンの場合はそのままで構いません。)
![Enable DevMode](https://P-nutsK.github.io/resource/chromium_devmode_button.png)
4. パッケージ化されていない拡張機能を読み込むを押して、先ほど解凍したフォルダごと選択します
5. 導入完了

## Use

| 入力 | 出力(例) |
----|----
| %ALL | 2000/12/25 12:34:56 |
| %YE | 2000 |
| %MO | 12 |
| %DA | 25 |
| %HO | 12 |
| %MI | 34 |
| %SE | 56 |
| %MS | 0(ただし当てにならないので注意) |
| %ISO | 2000-12-25T03:34:56.000Z |

また、Uを最初につける(%UALL,$UDAのように)と、UTCで表示されます。ISOには存在しません

※古いバージョンには%UALLが正しく機能しない不具合が発見されているので、更新を推奨します。
## Author

P_nutsK(私です)  
[Yukkku様](https://github.com/Yukkku)

## Licence

[MIT](https://licenses.opensource.jp/MIT/MIT.html)
