// ui-utils.js - UI操作のユーティリティ関数

// 既存のカードをクリア
function clearExistingCards() {
  cardList.innerHTML = '';
  cardData = [];
  downloadAllBtn.disabled = true;
  updateStats();
}

// カードデータをリセット
function resetCardData() {
  cardData = [];
  rawCsvData = [];
  cardList.innerHTML = '';
  csvPreview.innerHTML = '<p>CSVプレビューがここに表示されます</p>';
  downloadAllBtn.disabled = true;
  updateStats();
}

// ローディング状態を表示
function showLoadingState() {
  csvPreview.innerHTML = '<p>CSVファイルを処理中...</p>';
  cardList.innerHTML = '';
}

// ローディング状態を解除
function hideLoadingState() {
  // この時点でプレビューとカードは既に更新されているので、特に何もしない
}

// 成功メッセージを表示
function showSuccessMessage(fileName) {
  showToast(`${fileName} を読み込み、${cardData.length}枚のカードを生成しました`, 'success', 3000);
}

// リセット完了メッセージを表示
function showResetMessage() {
  showToast('アプリケーションをリセットしました', 'info', 2000);
}

function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, duration);
}

function updateStats() {
  if (cardCount) cardCount.textContent = cardData.length;
  if (rowCount) rowCount.textContent = rawCsvData.length > 0 ? Math.max(rawCsvData.length - 1, 0) : 0;
}
