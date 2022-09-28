'use strict';
const reg = /^-?[0-9]\d*(\.\d+)?/;

for (var table of document.getElementsByTagName('table')) {
  sortableTable(table);  
}


function sortableTable(myTable) {
  var items = [];
  var heads = [];
  var types = [];
  var lastSort = '';
  var op = 0;

  for (var i = 0; i < myTable.rows.length; i++) {
    if (i === 0) {
      for (var cell of myTable.rows[i].cells) {
        heads.push(cell.innerHTML);
        setUp(cell);
      }
    } else {
      items.push({});
      for (var j = 0; j < myTable.rows[i].cells.length; j++) {
        items[i - 1][heads[j]] = myTable.rows[i].cells[j].innerHTML;
      }
    }
    if (i === 1) {
      for (var k = 0; k < myTable.rows[i].cells.length; k++) {
        let f = heads[k];
        let date = parseDate(myTable.rows[i].cells[k].innerHTML);
        if (date != null) {
          types.push(sortDate(f));
        } else if (
          isNaN(parseInt(myTable.rows[i].cells[k].innerHTML))
        ) {
          types.push(sortStr(f));
        } else if (myTable.rows[i].cells[k].innerHTML.match(reg) != null) {
          types.push(sortInitialNum(f));
        } else {
          types.push(sortNum(f));
        }
      }
    }
  }
  function sortInitialNum(f) {
    return (a, b) => {
      return (toFloat(a[f]) - toFloat(b[f])) * op;
    };
  }

  function sortNum(f) {
    return (a, b) => {
      return (parseInt(a[f]) - parseInt(b[f])) * op;
    };
  }

  function sortStr(f) {
    return (a, b) => {
      let x = a[f].toLowerCase();
      let y = b[f].toLowerCase();
      if (x < y) {
        return -1 * op;
      }
      if (x > y) {
        return 1 * op;
      }
      return 0;
    };
  }

  function sortDate(f) {
    return (a, b) => {
      let x = parseDate(a[f]); 
      let y = parseDate(b[f]);
      if (x < y) {
        return -1 * op;
      }
      if (x > y) {
        return 1 * op;
      }
      return 0;
    };
  }

  function setUp(e) {
    let temp = e.innerHTML;
    e.setAttribute("tabindex", "0");
    e.addEventListener("mouseover", () => e.style.backgroundColor = "PaleGreen");
    e.addEventListener("focus", () => e.style.backgroundColor = "PaleGreen");
    e.addEventListener("mouseout", () => e.style.backgroundColor = "White");
    e.addEventListener("blur", () => e.style.backgroundColor = "White");
    e.addEventListener("click", () => sortByField(temp));
    e.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        sortByField(temp);
      }
    });
  }

  function sortByField(f) {
    op = (lastSort === f) ? -op : 1;
    lastSort = f;
    items.sort(types[heads.indexOf(f)]);
    redrawTable();
  }
  function redrawTable() {
    for (var i = 1; i < myTable.rows.length; i++) {
      for (var j = 0; j < myTable.rows[i].cells.length; j++) {
        myTable.rows[i].cells[j].innerHTML = items[i - 1][heads[j]];
      }
    }
  }
}

function toFloat(n) {
  let match = n.match(reg);
  return (match === null) ? 0 : parseFloat(match);
}

function parseDate(str) {
  var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return (m) ? new Date(m[3], m[2]-1, m[1]) : null;
}


