// text-renderer.js - テキスト描画機能

// 日本語テキストの折り返し処理（中央揃え用）
function wrapTextJapaneseCentered(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = [];
  let currentLine = '';
  
  // まず改行コードで分割
  const paragraphs = text.split(/\n/);
  
  for (const paragraph of paragraphs) {
    if (paragraph === '') {
      lines.push('');
      continue;
    }
    
    let currentX = 0;
    for (let i = 0; i < paragraph.length; i++) {
      const char = paragraph[i];
      const charWidth = ctx.measureText(char).width;
      
      // 行の最大幅を超える場合は改行
      if (currentX + charWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = char;
        currentX = charWidth;
      } else {
        currentLine += char;
        currentX += charWidth;
      }
    }
    
    // 最後の行を追加
    if (currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = '';
    }
  }
  
  // テキストを中央揃えで描画
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    ctx.fillText(line, x, y + (i * lineHeight));
  }
  
  // 描画した行数を返す
  return lines.length;
}

// 日本語テキストの折り返し処理
function wrapTextJapanese(ctx, text, x, y, maxWidth, lineHeight) {
  // 句読点で改行しないようにする
  const lines = [];
  let currentLine = '';
  
  // まず改行コードで分割
  const paragraphs = text.split(/\n/);
  
  for (const paragraph of paragraphs) {
    if (paragraph === '') {
      lines.push('');
      continue;
    }
    
    // イタリック（斜体）のチェック
    if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
      ctx.save();
      ctx.font = `italic ${textSize.value}px "Hiragino Sans", "Meiryo", sans-serif`;
      lines.push(paragraph);
      ctx.restore();
      continue;
    }
    
    let currentX = x;
    for (let i = 0; i < paragraph.length; i++) {
      const char = paragraph[i];
      const charWidth = ctx.measureText(char).width;
      
      // 行の最大幅を超える場合は改行
      if (currentX + charWidth > x + maxWidth) {
        lines.push(currentLine);
        currentLine = char;
        currentX = x + charWidth;
      } else {
        currentLine += char;
        currentX += charWidth;
      }
    }
    
    // 最後の行を追加
    if (currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = '';
    }
  }
  
  // テキストを描画
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // イタリック（斜体）のチェック
    if (line.startsWith('*') && line.endsWith('*')) {
      ctx.save();
      ctx.font = `italic ${textSize.value}px "Hiragino Sans", "Meiryo", sans-serif`;
      ctx.fillText(line.substring(1, line.length - 1), x, y + (i * lineHeight));
      ctx.restore();
    } else {
      ctx.fillText(line, x, y + (i * lineHeight));
    }
  }
}