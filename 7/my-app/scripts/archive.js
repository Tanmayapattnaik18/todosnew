document.addEventListener('DOMContentLoaded', () => {
    const archiveTableBody = document.getElementById('archive-table-body');
  
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let archive = JSON.parse(localStorage.getItem('archive')) || [];
  
    const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };
  
    const saveArchive = () => {
      localStorage.setItem('archive', JSON.stringify(archive));
    };
  
    const renderArchive = () => {
      archiveTableBody.innerHTML = '';
      archive.forEach((todo, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${todo.title}</td>
          <td class="${todo.priority}-priority">${todo.priority}</td>
          <td>${todo.status}</td>
          <td>
            <button class="restore" data-index="${index}">Restore</button>
            <button class="delete" data-index="${index}">Delete</button>
          </td>
        `;
        archiveTableBody.appendChild(row);
      });
  
      document.querySelectorAll('.restore').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          todos.push(archive[index]);
          archive.splice(index, 1);
          saveTodos();
          saveArchive();
          renderArchive();
        });
      });
  
      document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          archive.splice(index, 1);
          saveArchive();
          renderArchive();
        });
      });
    };
  
    renderArchive();
  });
  