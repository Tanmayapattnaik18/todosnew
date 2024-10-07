document.addEventListener('DOMContentLoaded', () => {
    const todoTitleInput = document.getElementById('todo-title');
    const todoPrioritySelect = document.getElementById('todo-priority');
    const addTodoButton = document.getElementById('add-todo');
    const todoTableBody = document.getElementById('todo-table-body');
    const filterPrioritySelect = document.getElementById('filter-priority');
    const filterStatusSelect = document.getElementById('filter-status');
  
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let archive = JSON.parse(localStorage.getItem('archive')) || [];
  
    const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };
  
    const saveArchive = () => {
      localStorage.setItem('archive', JSON.stringify(archive));
    };
  
    const renderTodos = (filterPriority = 'all', filterStatus = 'all') => {
      todoTableBody.innerHTML = '';
      todos
        .filter(todo => (filterPriority === 'all' || todo.priority === filterPriority) && (filterStatus === 'all' || todo.status === filterStatus))
        .forEach((todo, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${todo.title}</td>
            <td class="${todo.priority}-priority">${todo.priority}</td>
            <td>
              ${todo.status === 'pending' 
                ? `<button class="status-toggle" data-index="${index}">Pending</button>`
                : `<button class="status-toggle" data-index="${index}">Completed</button>`
              }
            </td>
            <td>
              <button class="archive" data-index="${index}">Archive</button>
            </td>
          `;
          todoTableBody.appendChild(row);
        });
  
      document.querySelectorAll('.status-toggle').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          todos[index].status = todos[index].status === 'pending' ? 'completed' : 'pending';
          saveTodos();
          renderTodos(filterPriority, filterStatus);
        });
      });
  
      document.querySelectorAll('.archive').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          archive.push(todos[index]);
          todos.splice(index, 1);
          saveTodos();
          saveArchive();
          renderTodos(filterPriority, filterStatus);
        });
      });
    };
  
    addTodoButton.addEventListener('click', () => {
      const title = todoTitleInput.value.trim();
      const priority = todoPrioritySelect.value;
      if (title === '') {
        alert('Todo cannot be empty!');
        return;
      }
      todos.push({ title, priority, status: 'pending' });
      saveTodos();
      renderTodos();
      todoTitleInput.value = '';
    });
  
    filterPrioritySelect.addEventListener('change', (e) => {
      renderTodos(e.target.value, filterStatusSelect.value);
    });
  
    filterStatusSelect.addEventListener('change', (e) => {
      renderTodos(filterPrioritySelect.value, e.target.value);
    });
  
    renderTodos();
  });
  