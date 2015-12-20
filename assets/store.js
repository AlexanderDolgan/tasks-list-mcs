var store = {};


store.save = function() {
  var json = JSON.stringify(tasks.list);
  localStorage.setItem('tasks', json);
}

store.load = function() {
  var savedTasks = localStorage.getItem('tasks');
  if (savedTasks) tasks.list = JSON.parse(savedTasks);
}


tasks.on('add', store.save);
tasks.on('close', store.save);

store.load();
