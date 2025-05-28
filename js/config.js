// config.js - アプリケーションの設定と基本変数

// DOM要素の参照
const csvInput = document.getElementById('csvInput');
const cardList = document.getElementById('cardList');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const resetBtn = document.getElementById('resetBtn');
const bgColor = document.getElementById('bgColor');
const borderColor = document.getElementById('borderColor');
const titleColor = document.getElementById('titleColor');
const textColor = document.getElementById('textColor');
const titleSize = document.getElementById('titleSize');
const textSize = document.getElementById('textSize');
const titleSizeValue = document.getElementById('titleSizeValue');
const textSizeValue = document.getElementById('textSizeValue');
const csvPreview = document.getElementById('csvPreview');

// カード生成用データ
let cardData = [];
let rawCsvData = [];

// カードの実際のサイズ定義
const CARD_WIDTH = 480;
const CARD_HEIGHT = 720;