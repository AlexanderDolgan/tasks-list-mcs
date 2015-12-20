var tasks = {}

/**
 * Список задач
 */
tasks.list = [];

/**
 * Объект с событиями
 */
tasks.events = {};

/**
 * Добавление задачи
 */
tasks.add = function(description) {
  tasks.list.push({ description: description, id: tasks.list.length });
  tasks.trigger('add');
}

/**
 * Закрытия задачи
 */
tasks.close = function(id) {
  id = Number(id);
  tasks.list[id].closed = true;
  tasks.trigger('close');
}

/**
 * Возвращает список задач
 */
tasks.show = function(id) {
  if (typeof id === 'number') {
    return tasks.list[id];
  } else {
    var list = [];
    var i = 0;
    while (i < tasks.list.length) {
      if (!tasks.list[i].closed) {
        list.push(tasks.list[i]);
      }
      i++;
    }
    return list.reverse();
  }
};

/**
 * Записывает колбек на событие
 */
tasks.on = function(name, fn) {
  if (!tasks.events[name]) tasks.events[name] = [];
  tasks.events[name].push(fn);
}

/**
 * Вызывает коллбеки, которые были записаны на событие
 */
tasks.trigger = function(name) {
  if (!tasks.events[name]) return;
  tasks.events[name].map(function(fn) { fn(); });
}

/**
 * Показывает сколько всего тасок, сколько закрыто, сколько открыто
 */
tasks.counters = function() {
  var all = tasks.list.length;
  var closed = tasks.list.filter(function (task) {
    return task.closed;
  }).length;
  var opened = all - closed;
  return {
    all: all,
    closed: closed,
    opened: opened
  };
}
