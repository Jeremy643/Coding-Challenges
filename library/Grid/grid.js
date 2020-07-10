class Grid {
    constructor(width, height, cellWidth) {
        this._width = width;
        this._height = height;
        this._cellWidth = cellWidth;
        this._cells = [];
        this._gridWarningMsgs = {
            'change_width': 'Warning: the width of the grid was changed to a better value given the cell width.',
            'change_height': 'Warning: the height of the grid was changed to a better value given the cell width.',
            'no_cells': 'Warning: there are no cells, make sure you have called makeGrid() on your grid object.',
        }
    }

    get getWidth() {
        return this._width;
    }

    get getHeight() {
        return this._height;
    }

    get getCellWidth() {
        return this._cellWidth;
    }

    get getCells() {
        return this._cells;
    }

    /**
     * @param {number} newWidth
     */
    set setWidth(newWidth) {
        this._width = newWidth;
        // re-build the grid with the new width
        this.makeGrid();
    }

    /**
     * @param {number} newHeight
     */
    set setHeight(newHeight) {
        this._height = newHeight;
        // re-build the grid with the new height
        this.makeGrid();
    }

    /**
     * @param {number} newCellWidth
     */
    set setCellWidth(newCellWidth) {
        this._cellWidth = newCellWidth;
        // re-build the grid with the new cell width
        this.makeGrid();
    }

    makeGrid() {
        // check width, height and cell width to make sure they fit well together
        let widthRem = this._width % this._cellWidth;
        if (widthRem !== 0 && this._width > this._cellWidth) {
          this._width -= widthRem;
          this.returnWarningMsg(this._gridWarningMsgs.change_width, width, this._width);
          width = this._width;
        } else if (widthRem !== 0 && this._width < this._cellWidth) {
          this._width = this._cellWidth;
          this.returnWarningMsg(this._gridWarningMsgs.change_width, width, this._width);
          width = this._width;
        }

        let heightRem = this._height % this._cellWidth;
        if (heightRem !== 0 && this._height > this._cellWidth) {
          this._height -= heightRem;
          this.returnWarningMsg(this._gridWarningMsgs.change_height, height, this._height);
          height = this._height;
        } else if (heightRem !== 0 && this._height < this._cellWidth) {
          this._height = this._cellWidth;
          this.returnWarningMsg(this._gridWarningMsgs.change_height, height, this._height);
          height = this._height;
        }

        createCanvas(width, height);
        
        let cols = floor(this._width/this._cellWidth);
        let rows = floor(this._height/this._cellWidth);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            this._cells.push(new Cell(i, j, this._cellWidth, cols, rows));
          }
        }
    }

    show() {
        if (this._cells.length === 0) {
            // user did not make grid
            this.returnWarningMsg(this._gridWarningMsgs.no_cells);
        } else {
            // display grid
            for (let i = 0; i < this._cells.length; i++) {
                this._cells[i].show();
            }
        }
    }

    /**
     * @param {string} msg
     * @param {number} prev
     * @param {number} curr
     */
    returnWarningMsg(msg, prev = undefined, curr = undefined) {
      if (prev && curr) {
        console.log(`${msg} Before = ${prev} | After = ${curr}`);
      } else {
        console.log(msg);
      }
    }
}

class Cell {
    constructor(col, row, w, cols, rows) {
      this.i = col;
      this.j = row;
      this.w = w;
      this.walls = [true, true, true, true]; // [top, right, bottom, left]
      this.cols = cols;
      this.rows = rows;
    }
  
    get getColumns() {
      return this.cols;
    }
  
    get getRows() {
      return this.rows;
    }
  
    show() {
      let x = this.i * this.w;
      let y = this.j * this.w;
      if (this.walls[0]) {
        line(x, y, x + this.w, y);
      }
      if (this.walls[1]) {
        line(x + this.w, y, x + this.w, y + this.w);
      }
      if (this.walls[2]) {
        line(x + this.w, y + this.w, x, y + this.w);
      }
      if (this.walls[3]) {
        line(x, y + this.w, x, y);
      }
    }
  }