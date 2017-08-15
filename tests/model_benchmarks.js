/**
 * Created by jenkinsd on 2017-04-09.
 *
 * Test script extracted for portability.
 *
 * This will get some benchmark numbers and report them.
 */

function filter(item, args) {
  // simulate a more expensive filer
  var matches = 0;
  if (item.title.indexOf("ask") !== -1) matches++;
  for (var j = 0; j < 5; j++)
    matches += Math.random();

  return item.percentComplete >= args;
}

var data = [];

for (var i = 0; i < 300000; i++) {
  var d = (data[i] = {});

  d["id"] = i;
  d["title"] = "Task " + i;
  d["percentComplete"] = i % 100;
  d["duration"] =  Math.round(Math.random() * 14);
}

var dv = new Slick.Data.DataView({inlineFilters: true});
dv.beginUpdate();
dv.setItems(data);
dv.setFilter(filter);
dv.setFilterArgs(0);
//dv.setPagingOptions({pageSize:25});

dv.setGrouping([
                 {
                   getter: "duration",
                   formatter: function (g) {
                     return "Duration:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
                   },
                   aggregators: [
                     new Slick.Data.Aggregators.Avg("percentComplete"),
                     new Slick.Data.Aggregators.Sum("cost")
                   ],
                   aggregateCollapsed: true,
                   aggregateChildGroups: true
                 },
                 {
                   getter: "effortDriven",
                   formatter: function (g) {
                     return "Effort-Driven:  " + (g.value ? "True" : "False") + "  <span style='color:green'>(" + g.count + " items)</span>";
                   },
                   aggregators: [
                     new Slick.Data.Aggregators.Avg("percentComplete"),
                     new Slick.Data.Aggregators.Sum("cost")
                   ],
                   aggregateCollapsed: false
                 }
               ]);

dv.endUpdate();


console.time("total");
console.time("narrow");

for (var i2 = 0; i2 <= 100; i2 += 5) {
  dv.setFilterArgs(i2);
  dv.setRefreshHints({
                       ignoreDiffsBefore:200,
                       ignoreDiffsAfter:300,
                       isFilterNarrowing:true
                     });
  dv.refresh();

  //console.log(dv.getLength());
}

console.timeEnd("narrow");

console.time("expand");

for (var i3 = 100; i3 > 0; i3 -= 5) {
  dv.setFilterArgs(i3);
  dv.setRefreshHints({
                       ignoreDiffsBefore:200,
                       ignoreDiffsAfter:300,
                       isFilterExpanding:true
                     });
  dv.refresh();

  //console.log(dv.getLength());
}

console.timeEnd("expand");
console.timeEnd("total");