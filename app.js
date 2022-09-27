'use strict';

const myTable = document.getElementById('myTable');
var items = [];
var heads = [];
var op = 1;


(function getTableData() {
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
  }
})();

function setUp(e) {
    let temp = e.innerHTML;
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
  // add sort by field function.
  console.log(`Sorting by: ${f}`);
}


function clearTable() {
  for (let i = 0; i < items.length; i++) {
    myTable.deleteRow(1);
  }
}


/*
function sortByField(f) {
    if (this.lastSort === f) {
        op *= -1;
    } else if (this.lastSort === '' && f === 'licenceReference'){
        op = -1;
    } else {
        op = 1;
    }
    this.lastSort = f;
    if it's a date 
        items.sort(this.sortDate(f));
    } else if (f === "buildingName") {
        items.sort(sortNum(f));
    } else {
        items.sort(sortStr(f));
    }
}

function getDigits(a) {
    let temp = a.split(' ')[0];
    let num = parseInt(temp);
    if (isNaN(num)) {
        num = parseInt(temp.slice(0,-1));
    }
    if (isNaN(num)) {
        num = 0;
    }
    return num;
}

function sortNum(f) {
    return (a, b) => {
        return (getDigits(a[f]) - getDigits(b[f])) * op;
    };

}
function sortStr(field) {
      return (a, b) => {
        let x = a[field].toLowerCase();
        let y = b[field].toLowerCase();
        if (x < y) {
          return -1 * this.op;
        }
        if (x > y) {
          return 1 * this.op;
        }
        return 0;
      };
    }


function sortDate(field) {
          return (a, b) => {
            let x = new Date(a[field]); 
            let y = new Date(b[field]);
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          };
        }

*/



