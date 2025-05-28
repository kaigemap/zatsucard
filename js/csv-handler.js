// csv-handler.js - CSV処理機能

// CSVファイルの処理
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) {
    // ファイルが選択されていない場合（リセットされた場合）
    resetCardData();
    return;
  }
  
  // 新しいファイルが選択された場合、既存のカードをクリア
  clearExistingCards();
  
  // ローディング状態を表示
  showLoadingState();
  
  Papa.parse(file, {
    header: false, // 配列形式で取得
    skipEmptyLines: true,
    complete: (results) => {
      console.log('PapaParseの結果:', results);
      console.log('メタ情報:', results.meta);
      console.log('全行のデータ:', results.data);
      
      if (results.data && results.data.length > 0) {
        rawCsvData = results.data;
        
        // CSVプレビューを表示
        displayCsvPreview(results.data);
        
        // カードデータに変換
        convertToCardData();
        
        // 成功メッセージを表示
        showSuccessMessage(file.name);
      } else {
        alert('CSVファイルにデータが見つかりませんでした。');
        resetCardData();
      }
      
      // ローディング状態を解除
      hideLoadingState();
    },
    error: (error) => {
      alert('CSVファイルの解析中にエラーが発生しました: ' + error);
      resetCardData();
      hideLoadingState();
    }
  });
}

// CSVプレビューを表示
function displayCsvPreview(data) {
  if (data.length === 0) return;
  
  // 最初の行をヘッダーとして扱う
  const headers = data[0] || [];
  const dataRows = data.slice(1);
  
  // 列の情報を表示
  let infoHtml = `<div style="margin-bottom: 10px; padding: 5px; background-color: #e8f4fd; border-radius: 3px;">`;
  infoHtml += `<strong>検出された列:</strong> ${headers.length}列<br>`;
  infoHtml += `<strong>タイトル列:</strong> ${headers[0] || '(空の列名)'}<br>`;
  if (headers.length > 1) {
    const textColumns = headers.slice(1).map((col, index) => col || `列${index + 2}`);
    infoHtml += `<strong>本文列:</strong> ${textColumns.join(', ')}`;
  }
  infoHtml += `<br><strong>データ行数:</strong> ${dataRows.length}行`;
  infoHtml += `</div>`;
  
  // 最大5行まで表示
  const previewData = dataRows.slice(0, 5);
  
  let tableHtml = '<table><thead><tr>';
  headers.forEach((header, index) => {
    const style = index === 0 ? 'background-color: #fff2cc;' : 'background-color: #e8f4fd;';
    const displayName = header || `列${index + 1}`;
    tableHtml += `<th style="${style}">${displayName}</th>`;
  });
  tableHtml += '</tr></thead><tbody>';
  
  previewData.forEach(row => {
    tableHtml += '<tr>';
    // rowは配列形式なので、インデックスでアクセス
    for (let i = 0; i < Math.max(headers.length, row.length); i++) {
      const cellValue = row[i] || '';
      const style = i === 0 ? 'background-color: #fff2cc;' : '';
      const displayValue = cellValue === '' ? '<em>(空)</em>' : cellValue;
      tableHtml += `<td style="${style}">${displayValue}</td>`;
    }
    tableHtml += '</tr>';
  });
  
  tableHtml += '</tbody></table>';
  csvPreview.innerHTML = infoHtml + tableHtml;
}

// CSVデータをカードデータに変換
function convertToCardData() {
  if (rawCsvData.length === 0) return;
  
  console.log('=== CSV処理開始 ===');
  console.log('全データ:', rawCsvData);
  
  // 最初の行はヘッダーとして扱い、2行目以降をデータとする
  const headers = rawCsvData[0] || [];
  const dataRows = rawCsvData.slice(1);
  
  console.log('ヘッダー行:', headers);
  console.log('データ行数:', dataRows.length);
  
  if (dataRows.length === 0) {
    alert('CSVファイルにデータ行が見つかりません。');
    return;
  }
  
  // カードデータに変換
  cardData = dataRows.map((row, index) => {
    console.log(`\n--- 行${index + 1}の処理 ---`);
    console.log(`行データ:`, row);
    
    // 1列目をタイトル
    const title = row[0] || '';
    console.log(`タイトル: "${title}"`);
    
    // 2列目以降を本文として結合
    let textParts = [];
    
    for (let i = 1; i < row.length; i++) {
      const content = row[i];
      console.log(`  列${i + 1}: "${content}" (型: ${typeof content})`);
      
      // undefinedやnullでない場合は処理
      if (content !== undefined && content !== null) {
        const trimmedContent = content.toString().trim();
        console.log(`    トリム後: "${trimmedContent}"`);
        // 空文字列でない場合のみ追加
        if (trimmedContent !== '') {
          textParts.push(trimmedContent);
          console.log(`    → 追加しました`);
        } else {
          console.log(`    → 空文字列のためスキップ`);
        }
      } else {
        console.log(`    → undefined/nullのためスキップ`);
      }
    }
    
    console.log(`最終的な本文要素:`, textParts);
    console.log(`結合後の本文: "${textParts.join('\\n')}"`);
    
    return {
      title: title,
      text: textParts.join('\n')
    };
  });
  
  // 空のタイトルの行を除外
  const originalCount = cardData.length;
  cardData = cardData.filter(card => card.title.trim() !== '');
  
  console.log(`\n=== 処理結果 ===`);
  console.log(`処理前のカード数: ${originalCount}`);
  console.log(`生成されたカード数: ${cardData.length}`);
  console.log('最初の3枚のカード:');
  cardData.slice(0, 3).forEach((card, index) => {
    console.log(`  カード${index + 1}: タイトル="${card.title}", 本文="${card.text}"`);
  });
  
  // カード生成
  generateCards(cardData);
  downloadAllBtn.disabled = false;
}