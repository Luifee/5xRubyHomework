let yourDeck = [];
let dealerDeck = [];
let yourPoint = 0;
let dealerPoint = 0;
let inGame = false; //使開局前無法要牌或進入莊家回合
let winner = 0; //0未定;1玩家;2莊家;3平手

//完成後載入項目
$(document).ready(function() {
	initCards();
	initButtons();
});

//莊家回合的行動
function dealerRound() {
	while(true) {
		sumPoint();
		if (dealerPoint < 21 && dealerDeck.length == 5) {
			break;
		} else if (dealerPoint < 17) {
			dealerDeck.push(deal());
		} else if (dealerPoint < yourPoint) {
			dealerDeck.push(deal());
		} else {
			break;
		}
	}
	checkWinnerAfterDealerRound();
	showWinStamp();
	renderGameTable();
}

//加總點數
function sumPoint() {
	yourPoint = calcPoint(yourDeck);
	dealerPoint = calcPoint(dealerDeck);
}

//刷新牌桌
function renderGameTable() {
	//轉換形成牌面樣貌
	yourDeck.forEach((card, i) => {
		let theCard = $(`#yourCard${i + 1}`);
		theCard.html(card.cardNumber());
		theCard.prev().html(card.cardSuit());
	});
	dealerDeck.forEach((card, i) => {
		let theCard = $(`#dealerCard${i + 1}`);
		theCard.html(card.cardNumber());
		theCard.prev().html(card.cardSuit());
	});
	//更新點數
	$(".your-cards h1").html(`你目前的點數為${yourPoint}點`);
	$(".dealer-cards h1").html(`莊家的點數為${dealerPoint}點`);
	//發牌等牌按鈕有效化
	$("#action-hit").attr("disabled", !inGame);
	$("#action-stand").attr("disabled", !inGame);
}

//進入莊家回合前的贏家判斷
function checkWinnerBeforeDealerRound() {
	switch(true) {
	//玩家21點
	case yourPoint == 21:
		winner = 1;
		break;
	//過五關
	case yourPoint < 21 && yourDeck.length == 5:
		winner = 1;
		break;
	//點數>21
	case yourPoint > 21:
		winner = 2;
		break;
	default:
		winner = 0;
		break;
	}
}

//進入莊家回合後的贏家判斷
function checkWinnerAfterDealerRound() {
	//比點數及平手應於dealerRound之後生效
	switch(true) {
	//過五關
	case dealerPoint < 21 && dealerDeck.length == 5:
		winner = 2;
		break;
	//平手
	case dealerPoint == yourPoint:
		winner = 3;
		break;
	//點數>21
	case dealerPoint > 21:
		winner = 1;
		break;
	//比點數
	case dealerPoint > yourPoint:
		winner = 2;
		break;
	default:
		winner = 0;
		break;
	}
}

//蓋勝利章
function showWinStamp() {
	if (winner !== 0) {
		inGame = false;
		winStamp();
		renderGameTable();
	}
}

//勝利章位置
function winStamp() {
	switch(winner) {
		case 1:
			$(".your-cards").addClass('win');
			break;
		case 2:
			$(".dealer-cards").addClass('win');
			break;
		case 3:
			$(".tied").addClass('tie');
			break;
		default:
			break;
	}
}

//清除上局資料
function resetGame() {
	deck = [];
	yourDeck = [];
	dealerDeck = [];
	yourPoint = 0;
	dealerPoint = 0;
	winner = 0;
	initCards();
	$('.card>span').html("");
	$('.zone').removeClass('win');
	$('.zone').removeClass('tie');
	console.clear();
}

//開新局
function newGame() {
	resetGame();
	deck = shuffle(buildDeck());
	yourDeck.push(deal());
	dealerDeck.push(deal());
	yourDeck.push(deal());
	inGame = true;
	sumPoint();
	checkWinnerBeforeDealerRound();
	showWinStamp();
	renderGameTable();
}

//要牌
function hit() {
	yourDeck.push(deal());
	sumPoint();
	checkWinnerBeforeDealerRound();
	showWinStamp();
	renderGameTable();
}

//進入莊家的回合
function stand() {
	inGame = false;
	dealerDeck.push(deal());
	checkWinnerAfterDealerRound();
	dealerRound();
}

//發牌
function deal() {
	return deck.shift();
}

//生成牌堆
function buildDeck() {
	let deck = [];
	for(let suit = 1; suit <= 4; suit++) {
		for(let number = 1; number <= 13; number++) {
			let c = new Card(suit, number);
			deck.push(c);
		}
	}
	return deck;
}

//點數計算邏輯
function calcPoint(deck) {
	let point = 0;
	let theDeck = [];
	deck.forEach(c => {
		point += c.cardPoint();
	});
	if (point < 12) {
		deck.forEach(obj => {
			theDeck.push(obj.cardNumber());
		});
		if (theDeck.includes("A")) {
			point += 10;
		}
	}	
	return point;
}

//寫完覺得和function沒兩樣的Deck類別
// class Deck {
//  	constructor(number) {
//  		this.number = number;
//  		this.yourPoint = Deck.point(yourDeck);
//  		this.dealerPoint = Deck.point(dealerDeck);
//  		this.bonus = Deck.bonus();
 	// }
 	// bonus() {
 	// 	switch(this.number) {
 	// 		case 1:
 	// 			console.log("Bonus!")
 	// 			return true;
 	// 		default:
 	// 			return false;
 	// 	}
 	// }
//  	static deckPoint(deck) {
//  		let point = 0;
//  		deck.forEach(card => {
// 			point += card.cardPoint();
// 			if (point < 12 && bonus() === true) {
// 				point += 10;
// 			}
// 		});
// 		console.log("總計為 "+ point);
// 		return point;
//  	}
// }

//用花色suit與點數number建構一副撲克牌
class Card {
	constructor(suit, number) {
		this.suit = suit;
		this.number = number;
	}
	cardNumber() {
		switch(this.number) {
			case 1:
				return "A";
			case 11:
				return "J";
			case 12:
				return "Q";
			case 13:
				return "K";
			default:
				return this.number;
		}
	}
	cardPoint() {
		switch(this.number) {
			case 11:
			case 12:
			case 13:
				return 10;
			default:
				return this.number;
		}
	}
	cardSuit() {
		switch(this.suit) {
			case 1:
				return "♠";
			case 2:
				return "♥";
			case 3:
				return "♦";
			case 4:
				return "♣";
		}
	}
}

//按鈕與對應的作用
function initButtons() {
	$("#action-new-game").click(evt => newGame());
	$("#action-hit").click(evt => hit());
	$("#action-stand").click(evt => stand());
}

//牌背花樣
function initCards() {
	$(".card div").html("㊗");
}

//洗牌
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}