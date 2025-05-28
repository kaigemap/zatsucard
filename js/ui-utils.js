// ui-utils.js - UI操作のユーティリティ関数

// 既存のカードをクリア
function clearExistingCards() {
  cardList.innerHTML = '';
  cardData = [];
  downloadAllBtn.disabled = true;
}

// カードデータをリセット
function resetCardData() {
  cardData = [];
  rawCsvData = [];
  cardList.innerHTML = '';
  csvPreview.innerHTML = '<p>CSVプレビューがここに表示されます</p>';
  downloadAllBtn.disabled = true;
}

// ローディング状態を表示
function showLoadingState() {
  csvPreview.innerHTML = '<p style="color: #666; font-style: italic;">CSVファイルを処理中...</p>';
  cardList.innerHTML = '<div style="text-align: center; padding: 2em; color: #666;">カードを生成中...</div>';
}

// ローディング状態を解除
function hideLoadingState() {
  // この時点でプレビューとカードは既に更新されているので、特に何もしない
}

// 成功メッセージを表示
function showSuccessMessage(fileName) {
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    padding: 1em 1.5em;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    font-size: 14px;
  `;
  message.textContent = `✓ ${fileName} を読み込み、${cardData.length}枚のカードを生成しました`;
  
  document.body.appendChild(message);
  
  // 3秒後に自動で消去
  setTimeout(() => {
    if (message.parentNode) {
      message.parentNode.removeChild(message);
    }
  }, 3000);
}

// リセット完了メッセージを表示
function showResetMessage() {
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #2196F3;
    color: white;
    padding: 1em 1.5em;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    font-size: 14px;
  `;
  message.textContent = '✓ アプリケーションをリセットしました';
  
  document.body.appendChild(message);
  
  // 2秒後に自動で消去
  setTimeout(() => {
    if (message.parentNode) {
      message.parentNode.removeChild(message);
    }
  }, 2000);
}