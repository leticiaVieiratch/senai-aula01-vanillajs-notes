/**
 * DevTask & Notes - Lógica da Aplicação em JavaScript Puro (Vanilla JS)
 * Disciplina: Frameworks Front-end
 * Docente: Prof. Me. Deivison S. Takatu
 */

(function () {
  'use strict';

  // Chaves do LocalStorage
  const STORAGE_KEY_TASKS = 'senai_vanilla_tasks_v1';
  const STORAGE_KEY_THEME = 'senai_vanilla_theme_v1';

  // Estado da aplicação
  let tasks = [];
  let currentFilter = 'all';
  let searchQuery = '';

  // Elementos do DOM
  const clockDisplay = document.getElementById('clockDisplay');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  const statTotal = document.getElementById('statTotal');
  const statPending = document.getElementById('statPending');
  const statCompleted = document.getElementById('statCompleted');

  const taskForm = document.getElementById('taskForm');
  const titleInput = document.getElementById('titleInput');
  const categoryInput = document.getElementById('categoryInput');
  const priorityInput = document.getElementById('priorityInput');
  const descInput = document.getElementById('descInput');
  const titleError = document.getElementById('titleError');
  const descError = document.getElementById('descError');

  const searchInput = document.getElementById('searchInput');
  const categoryFilters = document.getElementById('categoryFilters');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');
  const toast = document.getElementById('toast');

  // ===================== Relógio em Tempo Real =====================
  function initClock() {
    const updateTime = () => {
      const now = new Date();
      clockDisplay.textContent = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // ===================== Gerenciamento de Tema =====================
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'light';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(STORAGE_KEY_THEME, newTheme);
      showToast(`Tema alterado para ${newTheme === 'dark' ? 'Escuro' : 'Claro'}`);
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Claro';
    } else {
      document.body.classList.remove('dark-mode');
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Escuro';
    }
  }

  // ===================== Armazenamento Local (LocalStorage) =====================
  function loadTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_TASKS);
      if (data) {
        tasks = JSON.parse(data);
      } else {
        // Dados de exemplo para demonstração inicial
        tasks = [
          {
            id: '1',
            title: 'Entender a diferença entre Framework e Biblioteca',
            category: 'Estudo',
            priority: 'Alta',
            description: 'Framework dita o fluxo da arquitetura (Inversão de Controle), enquanto biblioteca é chamada sob demanda.',
            completed: true,
            createdAt: new Date().toLocaleDateString('pt-BR')
          },
          {
            id: '2',
            title: 'Configurar ambiente e versionamento com Git',
            category: 'Projeto',
            priority: 'Média',
            description: 'Criar repositório no GitHub, versionar usando commits semânticos e realizar o deploy inicial na Vercel.',
            completed: false,
            createdAt: new Date().toLocaleDateString('pt-BR')
          },
          {
            id: '3',
            title: 'Planejar o Projeto Integrador no Scrum',
            category: 'Reunião',
            priority: 'Baixa',
            description: 'Definir Product Backlog, Sprints, quadro Kanban e o Definition of Done (DoD).',
            completed: false,
            createdAt: new Date().toLocaleDateString('pt-BR')
          }
        ];
        saveTasks();
      }
    } catch (e) {
      console.error('Erro ao carregar dados do LocalStorage:', e);
      tasks = [];
    }
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    updateMetrics();
    renderTasks();
  }

  // ===================== Atualização de Métricas =====================
  function updateMetrics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    statTotal.textContent = total;
    statCompleted.textContent = completed;
    statPending.textContent = pending;
  }

  // ===================== Validação e Criação =====================
  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const priority = priorityInput.value;
    const description = descInput.value.trim();

    let hasError = false;

    // Validação do título
    if (!title) {
      titleError.textContent = 'Por favor, informe o título.';
      titleInput.focus();
      hasError = true;
    } else if (title.length < 3) {
      titleError.textContent = 'O título deve ter no mínimo 3 caracteres.';
      hasError = true;
    } else {
      titleError.textContent = '';
    }

    // Validação da descrição
    if (!description) {
      descError.textContent = 'Por favor, descreva os detalhes.';
      if (!hasError) descInput.focus();
      hasError = true;
    } else {
      descError.textContent = '';
    }

    if (hasError) return;

    // Criar nova tarefa
    const newTask = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      description,
      completed: false,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    tasks.unshift(newTask);
    saveTasks();

    // Resetar formulário
    taskForm.reset();
    priorityInput.value = 'Média';
    titleInput.focus();

    showToast('Registro cadastrado com sucesso!');
  });

  // Limpar erros durante digitação
  titleInput.addEventListener('input', () => {
    if (titleInput.value.trim().length >= 3) titleError.textContent = '';
  });
  descInput.addEventListener('input', () => {
    if (descInput.value.trim().length > 0) descError.textContent = '';
  });

  // ===================== Renderização da Lista =====================
  function renderTasks() {
    // Filtragem
    let filtered = tasks.filter(task => {
      const matchesCategory = currentFilter === 'all' || task.category === currentFilter;
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    taskList.innerHTML = '';

    if (filtered.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';

    filtered.forEach(task => {
      const taskEl = document.createElement('article');
      taskEl.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
      taskEl.dataset.id = task.id;

      taskEl.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Marcar como concluída">
        <div class="task-details">
          <div class="task-meta">
            <span class="tag-badge">${escapeHtml(task.category)}</span>
            <span class="priority-badge ${escapeHtml(task.priority)}">${escapeHtml(task.priority)}</span>
            <span class="task-date">📅 ${escapeHtml(task.createdAt)}</span>
          </div>
          <h3 class="task-title">${escapeHtml(task.title)}</h3>
          <p class="task-desc">${escapeHtml(task.description)}</p>
        </div>
        <div class="task-actions">
          <button class="btn-icon delete-btn" title="Excluir" aria-label="Excluir tarefa">🗑️</button>
        </div>
      `;

      // Evento de marcar como concluído
      const checkbox = taskEl.querySelector('.task-checkbox');
      checkbox.addEventListener('change', () => toggleTask(task.id));

      // Evento de exclusão
      const deleteBtn = taskEl.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      taskList.appendChild(taskEl);
    });
  }

  function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      showToast(task.completed ? 'Tarefa marcada como concluída!' : 'Tarefa reaberta!');
    }
  }

  function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      showToast('Registro removido com sucesso!');
    }
  }

  // Limpar todas as concluídas
  clearCompletedBtn.addEventListener('click', () => {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
      showToast('Não há tarefas concluídas para remover.');
      return;
    }
    if (confirm(`Deseja remover as ${completedCount} tarefas concluídas?`)) {
      tasks = tasks.filter(t => !t.completed);
      saveTasks();
      showToast(`${completedCount} registros concluídos removidos!`);
    }
  });

  // ===================== Filtros e Busca =====================
  categoryFilters.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-pill')) {
      document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderTasks();
    }
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderTasks();
  });

  // ===================== Notificação Toast =====================
  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Prevenção contra injeção de HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ===================== Inicialização =====================
  initClock();
  initTheme();
  loadTasks();
})();
