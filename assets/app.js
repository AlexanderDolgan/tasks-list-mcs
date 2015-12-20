var app = {};

app.init = function() {
  app.render();
  app.initForm();
  app.initCheckboxes()
  tasks.on('add', app.render);
  tasks.on('close', app.render);
};

app.initForm = function() {
  // Добавляем задачи на клик по кнопке новой задачи
  $('.js-new-task__btn').on('click', function() {
    var $input = $('.js-new-task__desc'); // находим инпут
    tasks.add($input.val()); // передаём значение в модель
    $input.val(''); // очищаем input
  });
}

app.initCheckboxes = function() {
  $('.js-tasks-list').on('change', 'input', function() {
    var id = $(this).attr('data-id');
    tasks.close(id);
  });
}

app.render = function() {
  app.renderTasks();
  app.renderCounters();
}

app.renderTasks = function() {
  var items = tasks.show().map(app.renderTask);
  $('.js-tasks-list').html(items.join(''));
}


app.renderTask = function(task) {
  return [
    '<li class="list-group-item">',
      '<label>',
        '<input data-id="' + task.id + '" type="checkbox" ' + (task.closed ? 'checked' : '') + '>  ',
          task.description,
      '</label>',
    '</li>'
  ].join('');
}

app.renderCounters = function() {
  var counters = tasks.counters();
  var html = [
    '<div class="text-right text-mutted">',
      '<ul class="list-unstyled">',
        '<li>Всего:' + counters.all + '</li>',
        '<li>Открыто:' + counters.opened + '</li>',
        '<li>Закрыто:' + counters.closed + '</li>',
      '</ul>',
    '</div>'
  ].join('')
  $('.js-counters').html(html);
}

app.init();
