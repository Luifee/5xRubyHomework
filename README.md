# 5xRuby BlackJack作業  

### 稍微記錄這份作業相較於授課內容有那些修改。  

## 莊家回合dealerRound  

* 得17分前會持續要牌  
  參考中文[wiki的21點規則](https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%8D%81%E4%B8%80%E9%BB%9E)  

* 過五關規則  

## 加總點數sumPoint  

* 拉出來另成function  

## 贏家判斷checkWinner  

* 切分為進入莊家回合前與進入莊家回合後兩個function  
  藉此避免開局/中途即平手的問題  

* 過五關規則  

## 勝利/平手裝飾showWinStamp  

* 增加平手標示  

* 切分為蓋章及印章標示兩個function  
  然而現在想不起來這麼做的理由  

## 清除上局資料resetGame  

* 參考課程下的討論區進行修改  

* 另外放了console.clear();清除舊局的console訊息  

## 要牌/進入莊家回合hit/stand  

* 兩個都從initButtoms拉出來自成function  

## 計算點數calcPoint  

* 將Ace從預設值11的減分寫法  
  改成預設值為1的加分寫法  

* 當卡堆有Ace又沒超過12分時，加10分  

* 原本想按照習題要求試著寫成Class Deck但失敗了  
  經友人勸告果斷放棄為難自己
