document.addEventListener('DOMContentLoaded', () => {
  // Éléments DOM
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const clearButton = document.getElementById('clear');
  const counter = document.getElementById('task-counter');

  // Fonction pour créer une nouvelle tâche
  const createTaskElement = (taskText) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    // Création du contenu de la tâche
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    
    // Bouton de suppression
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&times;';
    deleteButton.className = 'delete-btn';
    deleteButton.setAttribute('aria-label', 'Supprimer la tâche');
    
    // Événements
    deleteButton.addEventListener('click', () => {
      li.remove();
      updateUI();
    });
    
    // Marquage comme complété
    li.addEventListener('click', (e) => {
      if (e.target !== deleteButton) {
        li.classList.toggle('completed');
      }
    });
    
    // Assemblage des éléments
    li.appendChild(taskContent);
    li.appendChild(deleteButton);
    
    return li;
  };

  // Mise à jour de l'interface
  const updateUI = () => {
    const tasks = todoList.querySelectorAll('li');
    const taskCount = tasks.length;
    
    // Mise à jour du compteur
    if (counter) {
      counter.textContent = `${taskCount} tâche${taskCount !== 1 ? 's' : ''}`;
    }
    
    // Affichage du bouton Clear
    clearButton.hidden = taskCount === 0;
    
    // Sauvegarde dans localStorage
    saveTasks();
  };

  // Sauvegarde des tâches
  const saveTasks = () => {
    const tasks = [];
    todoList.querySelectorAll('li span').forEach(task => {
      tasks.push(task.textContent);
    });
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  };

  // Chargement des tâches
  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    savedTasks.forEach(task => {
      todoList.appendChild(createTaskElement(task));
    });
    updateUI();
  };

  // Événements
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    
    if (taskText) {
      todoList.appendChild(createTaskElement(taskText));
      todoInput.value = '';
      updateUI();
      todoInput.focus();
    }
  });

  clearButton.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment supprimer toutes les tâches ?')) {
      todoList.innerHTML = '';
      updateUI();
    }
  });

  // Initialisation
  loadTasks();
});