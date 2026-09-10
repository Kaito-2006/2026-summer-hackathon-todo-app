const taskInput = document.getElementById('task-input');
const taskButton = document.getElementById('task-button');
const taskDisplay = document.getElementById('task-display');

// ローカルストレージから既存のタスクを取得
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

// タスクを追加する関数
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const newTask = {
        id : Date.now(),
        text : taskText
    };

    tasks.push(newTask);
    reload();

    taskInput.value = '';
    taskInput.focus();
}

// 保存・更新する関数
function reload(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// 画面にタスク一覧を描画する関数
function renderTasks() {
    taskDisplay.textContent = '';

    tasks.forEach(task => {
        // 入力した内容をli要素で表示
        const li = document.createElement('li');
        li.textContent = task.text;

        // 編集ボタン
        const editButton = document.createElement('button');
        editButton.textContent = '編集';
        editButton.style.marginLeft = '10px';
        
        // 削除ボタン
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.style.marginLeft = '10px';

        // 編集機能
        editButton.addEventListener('click', () => {
            localStorage.setItem('editTaskId', task.id);
            window.location.href = 'edit.html';
        });

        // 削除機能
        deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            reload();
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskDisplay.appendChild(li);
    });
}

// 追加ボタンを押した場合
taskButton.addEventListener('click', addTask);