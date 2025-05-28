// download-manager.js - ダウンロード機能

// 個別カードのダウンロード
function downloadCard(canvas, filename) {
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// すべてのカードをZIPでダウンロード
function downloadAllCards() {
  if (cardList.children.length === 0) return;
  
  const zip = new JSZip();
  const promises = [];
  
  // カードリストからカードラッパーを取得
  const cardWrappers = Array.from(cardList.children);
  
  // 各カードをZIPに追加
  cardWrappers.forEach((wrapper, i) => {
    // フルサイズのカードを生成
    const canvas = document.createElement('canvas');
    canvas.width = CARD_WIDTH;
    canvas.height = CARD_HEIGHT;
    const ctx = canvas.getContext('2d');
    
    // カードを描画
    drawCard(ctx, canvas, cardData[i]);
    
    const promise = new Promise((resolve) => {
      canvas.toBlob((blob) => {
        zip.file(`card_${i + 1}.png`, blob);
        resolve();
      });
    });
    promises.push(promise);
  });
  
  // すべての処理が完了したらZIPをダウンロード
  Promise.all(promises).then(() => {
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'cards.zip');
    });
  });
}