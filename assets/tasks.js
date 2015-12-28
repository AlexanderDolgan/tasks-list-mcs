var tasks = {}

tasks.list = [];
tasks.events = {};

tasks.add = function(description) {
  var pos = tasks.list.length;
  tasks.list.push({ description: description });
  tasks.trigger('add', tasks.list[pos]);
}

tasks.close = function(id) {
  // id = Number(id);
  var task = tasks.list.filter(function(task) {
    return task.id == id;
  })[0];
  if (!task) return;
  task.closed = true;
  tasks.trigger('close', task);
}

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

tasks.counters = function() {
  var all = tasks.list.length;
  var closed = tasks.show().length;
  var opened = all - closed;
  return {
    all: all,
    opened: opened,
    closed: closed
  }
}

tasks.on = function(event, callback) {
  if (!tasks.events[event]) {
    tasks.events[event] = [];
  }
  tasks.events[event].push(callback);
}


tasks.trigger = function(event, data) {
  if (!tasks.events[event]) { return; }
  tasks.events[event].map(function(callback){
    callback(data);
  })
}
