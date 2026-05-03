// drag-drop.js - ドラッグ&ドロップ機能の実装

/**
 * ドラッグ&ドロップ機能を初期化
 */
function initDragAndDrop() {
  // ドラッグオーバー時の処理
  dragDropArea.addEventListener('dragover', handleDragOver);
  dragDropArea.addEventListener('dragenter', handleDragEnter);
  dragDropArea.addEventListener('dragleave', handleDragLeave);
  dragDropArea.addEventListener('drop', handleDrop);
  
  // クリック時にファイル選択ダイアログを開く
  dragDropArea.addEventListener('click', () => {
    csvInput.click();
  });

  dragDropArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      csvInput.click();
    }
  });
}

/**
 * ドラッグオーバー時の処理
 * @param {DragEvent} e - ドラッグイベント
 */
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  
  // ファイルがドラッグされている場合のみ処理
  if (e.dataTransfer.items) {
    const items = Array.from(e.dataTransfer.items);
    const hasFiles = items.some(item => item.kind === 'file');
    
    if (hasFiles) {
      e.dataTransfer.dropEffect = 'copy';
      dragDropArea.classList.add('drag-over');
    }
  }
}

/**
 * ドラッグエンター時の処理
 * @param {DragEvent} e - ドラッグイベント
 */
function handleDragEnter(e) {
  e.preventDefault();
  e.stopPropagation();
  dragDropArea.classList.add('drag-over');
}

/**
 * ドラッグリーブ時の処理
 * @param {DragEvent} e - ドラッグイベント
 */
function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  
  // 要素から完全に離れた場合のみクラスを削除
  if (!dragDropArea.contains(e.relatedTarget)) {
    dragDropArea.classList.remove('drag-over');
  }
}

/**
 * ドロップ時の処理
 * @param {DragEvent} e - ドロップイベント
 */
function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  
  dragDropArea.classList.remove('drag-over');
  
  const files = Array.from(e.dataTransfer.files);
  const csvFiles = files.filter(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
  
  if (csvFiles.length === 0) {
    showErrorMessage('CSVファイルをドロップしてください');
    return;
  }
  
  if (csvFiles.length > 1) {
    showErrorMessage('一度に処理できるCSVファイルは1つだけです');
    return;
  }
  
  // 最初のCSVファイルを処理
  const csvFile = csvFiles[0];
  
  // ファイル入力要素に設定（既存の処理を再利用）
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(csvFile);
  csvInput.files = dataTransfer.files;
  
  // 既存のファイルアップロード処理を呼び出し
  handleFileUpload({ target: csvInput });
}

/**
 * ドラッグ&ドロップのエラーメッセージ表示
 * @param {string} message - エラーメッセージ
 */
function showErrorMessage(message) {
  showToast(message, 'error', 3000);
}
