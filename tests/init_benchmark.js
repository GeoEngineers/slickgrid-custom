function bench(dispose) {
  var startTime = new Date();
  var container = $("#container");
  for (var i = 0; i < 20; i++) {
    var parentEl = $("<div style='width:600px;height:400px;'></div>").appendTo(container);
    var grid = createGrid(parentEl);
    if (dispose) {
      grid.destroy();
      parentEl.remove();
    }
  }
  alert((new Date() - startTime));
}

function createGrid(parentEl) {
  var data = [{}, {}, {}];
  var columns = [];
  for (var i = 0; i < 20; i++) {
    columns.push({id: "field" + i, name: "field" + i, field: "field" + i});
  }

  var options = {
    enableCellNavigation: true,
    enableColumnReorder: false
  };

  return new Slick.Grid(parentEl, data, columns, options);
}
