document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge: 'left'});
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {yearRange: 30});
  });
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {yearRange: 30});
});

document.addEventListener('DOMContentLoaded', function() {
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el, {swipeable : false, duration:100});
    // instance.close;
});
