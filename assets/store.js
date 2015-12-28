var store = (function Store() {

  var api = 'http://mcs.shuvalov.info/a8h333.tasks/';

  return {
    save: function(task) {
      var url = api;
      if (task.id) { url += task.id; }
      $.post(url, task, function(response) {
        task.id = response.id;
        app.render();
      });
    },
    load: function() {
      $.get(api, function(response) {
        console.log(response);
        tasks.list = response;
        app.render();
      });
    }
  };
})();

tasks.on('add', store.save);
tasks.on('close', store.save);

store.load();
