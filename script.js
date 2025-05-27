const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const clearButton = document.getElementById('clear');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const todoText = input.value.trim();
      if (todoText) {
        const li = document.createElement('li');
        li.textContent = todoText;
        li.addEventListener('click', function() {
          this.remove();
          updateClearButtonVisibility();
        });
        todoList.appendChild(li);
        input.value = '';
        updateClearButtonVisibility();
      }
    });

    clearButton.addEventListener('click', function() {
      todoList.innerHTML = '';
      updateClearButtonVisibility();
    });

    function updateClearButtonVisibility() {
      clearButton.hidden = todoList.children.length === 0;
      
    }