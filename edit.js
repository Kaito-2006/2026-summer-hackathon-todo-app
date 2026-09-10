const editInput = document.getElementById('edit-input');
const editButton = document.getElementById('edit-button');
const cancelButton = document.getElementById('cancel-button');

// ローカルストレージからタスクと対象IDを取得
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const editTaskId = Number(localStorage.getItem('editTaskId'));

const editTask = tasks.find(t => t.id === editTaskId);

// 編集前のタスクをplaceholderで表示する
if(editTask){
    editInput.value = '';
    editInput.placeholder = editTask.text;
}

// 編集機能
editButton.addEventListener('click', () => {
    const newText = editInput.value.trim();
    
    // 何も入力されていない場合
    if(newText === ''){
        alert('変更がない場合は、キャンセルボタンを押してください');
        return;
    }

    // データを更新・保存する
    if(editTask){
        editTask.text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // 編集用IDを削除してメイン画面に戻る
    localStorage.removeItem('editTaskId');
    window.location.href = 'index.html';
});

cancelButton.addEventListener('click', () => {
    // 編集用IDを削除してメイン画面に戻る
    localStorage.removeItem('editTaskId');
    window.location.href = 'index.html';
});