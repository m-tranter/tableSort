"use strict";

class Sortable {
  constructor(e) {
    this.table = e;
    this.reg = /^-?[0-9]\d*(\.\d+)?/;
    this.items = [];
    this.cols = [];
    this.funcs = {};
    this.lastSort = "";
    this.op = 0;
    this.addNote();
    this.makeSortable();
  }

  addNote() {
    const note = document.createElement("p");
    note.appendChild(document.createTextNode("Click on a heading to sort by that column."));
    note.classList.add("cec-green");
    this.table.parentNode.insertBefore(note, this.table);
  }

  makeSortable() {
    for (let cell of this.table.rows[0].cells) {
      this.cols.push(cell.innerText);
      this.funcs[cell.innerText] = "";
      this.setUp(cell);
    }

    for (var k = 0; k < this.table.rows[1].cells.length; k++) {
      let f = this.cols[k];
      let str = this.table.rows[1].cells[k].innerText;
      let date = this.parseDate(str);
      if (date != null) {
        this.funcs[f] = this.sortDate(f);
      } else if (str.match(this.reg) == null) {
        this.funcs[f] = this.sortStr(f);
      } else {
        this.funcs[f] = this.sortInitialNum(f);
      }
    }

    for (var i = 1; i < this.table.rows.length; i++) {
      this.items.push({});
      for (var j = 0; j < this.table.rows[i].cells.length; j++) {
        this.items[i - 1][this.cols[j]] = this.table.rows[i].cells[j].innerHTML;
        this.items[i - 1][`${this.cols[j]}inner`] = this.table.rows[i].cells[j].innerText;
      }
    }
  }

  sortInitialNum(f) {
    f += 'inner';
    return (a, b) => {
      return (this.toFloat(a[f]) - this.toFloat(b[f])) * this.op;
    };
  }

  sortStr(f) {
    f += 'inner';
    return (a, b) => {
      let x = a[f].toLowerCase();
      let y = b[f].toLowerCase();
      if (x < y) {
        return -1 * this.op;
      }
      if (x > y) {
        return 1 * this.op;
      }
      return 0;
    };
  }

  sortDate(f) {
    f += 'inner';
    return (a, b) => {
      let x = this.parseDate(a[f]);
      let y = this.parseDate(b[f]);
      if (x < y) {
        return -1 * this.op;
      }
      if (x > y) {
        return 1 * this.op;
      }
      return 0;
    };
  }

  setUp(e) {
    let temp = e.innerText;
    e.setAttribute("tabindex", "0");
    e.addEventListener(
      "mouseover",
      () => (e.style.backgroundColor = "PaleGreen")
    );
    e.addEventListener(
      "focus",
      () => (e.style.backgroundColor = "PaleGreen")
    );
    e.addEventListener(
      "mouseout",
      () => (e.style.backgroundColor = "White")
    );
    e.addEventListener("blur", () => (e.style.backgroundColor = "White"));
    e.addEventListener("click", () => this.sortByField(temp));
    e.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        this.sortByField(temp);
      }
    });
  }

  sortByField(f) {
    this.op = this.lastSort === f ? -this.op : 1;
    this.lastSort = f;
    this.items.sort(this.funcs[f]);
    this.redrawTable();
  }

  toFloat(n) {
    let match = n.match(this.reg);
    return match === null ? 0 : parseFloat(match);
  }

  parseDate(str) {
    var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return m ? new Date(m[3], m[2] - 1, m[1]) : null;
  }

  redrawTable() {
    for (var i = 1; i < this.table.rows.length; i++) {
      for (var j = 0; j < this.table.rows[i].cells.length; j++) {
        this.table.rows[i].cells[j].innerHTML = this.items[i - 1][this.cols[j]];
      }
    }
  }
}


for (let e of document.getElementsByTagName("table")) {
  let temp = new Sortable(e);
}
