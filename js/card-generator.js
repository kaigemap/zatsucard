// card-generator.js - カード生成機能

// カードの生成
function generateCards(data) {
    cardList.innerHTML = '';
    
    data.forEach((card, i) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'cardWrapper';
        
        // カードを描画するCanvas（フルサイズ）
        const canvas = document.createElement('canvas');
        canvas.width = CARD_WIDTH;
        canvas.height = CARD_HEIGHT;
        canvas.style.display = 'none'; // フルサイズCanvasは非表示
        const ctx = canvas.getContext('2d');
        
        // カードの描画
        drawCard(ctx, canvas, card);
        
        // プレビュー用の小さいCanvas
        const previewCanvas = document.createElement('canvas');
        previewCanvas.className = 'card-preview';
        previewCanvas.width = 240;
        previewCanvas.height = Math.floor(CARD_HEIGHT * (240 / CARD_WIDTH));
        const previewCtx = previewCanvas.getContext('2d');
        
        // フルサイズのカードをプレビューサイズにリサイズ
        previewCtx.drawImage(canvas, 0, 0, CARD_WIDTH, CARD_HEIGHT, 0, 0, previewCanvas.width, previewCanvas.height);
        
        // ダウンロードボタン
        const dlBtn = document.createElement('button');
        dlBtn.textContent = 'ダウンロード';
        dlBtn.onclick = () => downloadCard(canvas, `card_${i + 1}`);
        
        wrapper.appendChild(previewCanvas);
        wrapper.appendChild(dlBtn);
        cardList.appendChild(wrapper);
    });
}

// カードの描画
function drawCard(ctx, canvas, card) {
    // 背景
    ctx.fillStyle = bgColor.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 枠線
    ctx.strokeStyle = borderColor.value;
    ctx.lineWidth = 3;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
    
    // タイトル（自動改行対応）
    ctx.fillStyle = titleColor.value;
    ctx.font = `bold ${titleSize.value}px "Hiragino Sans", "Meiryo", sans-serif`;
    ctx.textAlign = 'center';
    const titleLineHeight = parseInt(titleSize.value) * 1.2;
    const titleLines = wrapTextJapaneseCentered(ctx, card.title || '', canvas.width / 2, 80, canvas.width - 60, titleLineHeight);
    
    // タイトルの高さを計算して本文の開始位置を決定
    const titleHeight = titleLines * titleLineHeight;
    const textStartY = Math.max(150, 80 + titleHeight + 30); // 最低150px、またはタイトル終了から30px下
    
    // 説明文
    ctx.fillStyle = textColor.value;
    ctx.font = `${textSize.value}px "Hiragino Sans", "Meiryo", sans-serif`;
    ctx.textAlign = 'left';
    wrapTextJapanese(ctx, card.text || '', 30, textStartY, canvas.width - 60, parseInt(textSize.value) * 1.5);
}