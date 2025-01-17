import { makeAutoObservable, reaction } from "mobx";
import { RootStore } from "./RootStore";
import Match from "../domain/Match";
import Grid, { MatchResult } from "../domain/Grid";

const squareSize = 8;

interface SimpleCell {
  x: number;
  y: number;
}

export default class GridStore {
  private rootStore: RootStore;

  matches: Match[] = [];
  oldMatches: Match[] = [];
  grid: Grid = new Grid(squareSize);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.init();
    makeAutoObservable(this);
    this.reactionToNewMatch();
  }

  reactionToNewMatch() {
    reaction(
      () => this.matches,
      (newMatches: Match[]) => {
        console.log(newMatches);
        const matches = newMatches.filter((x) => !this.oldMatches.includes(x));
        matches.forEach((match) => {
          setTimeout(() => {
            this.rootStore.messageStore.addMatch(match);
          }, 400);
          if (match.suite === 2) {
            setTimeout(() => {
              this.rootStore.statStore.addMatch3();
            }, 400);
          }
          if (match.suite === 3) {
            setTimeout(() => {
              this.rootStore.statStore.addMatch4();
            }, 400);
          }
          if (match.suite === 4) {
            setTimeout(() => {
              this.rootStore.statStore.addMatch5();
            }, 400);
          }
          setTimeout(() => {
            this.rootStore.statStore.addColor(match.color, match.suite + 1);
          }, 400);
        });
        this.oldMatches = [...newMatches];
      }
    );
  }

  init() {
    this.grid = new Grid(squareSize);
    this.grid.cells.forEach((cell) => {
      this.rootStore.statStore.addColorCount(cell.name, 1);
    });
  }

  get info() {
    return {
      grid: this.grid,
      selectedCell: this.grid.selectedCell,
      canMove: this.grid.canMove,
    };
  }

  reset = () => {
    this.rootStore.statStore.reset();
    this.grid = new Grid(squareSize);
    this.grid.cells.forEach((cell) => {
      this.rootStore.statStore.addColorCount(cell.name, 1);
    });
    this.rootStore.messageStore.add("Reset");
  };

  select = (x: number, y: number) => {
    const selectedCell = this.grid.selectedCell;
    let sc: SimpleCell | null = null;
    if (selectedCell !== null) {
      sc = { x: selectedCell.x, y: selectedCell.y };
    }
    if (this.grid.select(x, y)) {
      if (sc !== null) {
        this.grid.invertCellsPosition(sc.x, sc.y, x, y);
        const matches: MatchResult = this.grid.getGridMatch(false);
        if (matches.cellsToRemove.length === 0) {
          setTimeout(() => {
            if (sc !== null) {
              this.grid.invertCellsPosition(x, y, sc.x, sc.y);
            }
            this.grid.canMove = true;
          }, 500);
        } else if (matches.cellsToRemove.length > 0) {
          setTimeout(() => {
            this.matches = this.matches.concat(matches.matches);
          }, 50);
          setTimeout(() => {
            this.removeMatches(matches.cellsToRemove);
          }, 400);
        } else {
          this.grid.canMove = true;
        }
      } else {
        this.grid.canMove = true;
      }
    }
  };

  countMatch(match: Match) {
    this.matches.push(match);
  }

  getMatch(isCombo: boolean = false): MatchResult {
    return this.grid.getGridMatch(isCombo);
  }

  removeMatches(simpleCells: SimpleCell[]) {
    simpleCells.forEach((match) => {
      const cell = this.grid.get(match.x, match.y);
      if (cell !== null) {
        this.rootStore.statStore.addColorCount(cell.name, -1);
      }
    });
    const newCells = this.grid.removeMatches(simpleCells);
    newCells.forEach((c) => {
      this.rootStore.statStore.addColorCount(c.name, 1);
    });
    setTimeout(() => {
      this.grid.moveNewCells();
    }, 100);
    const newMatches: MatchResult = this.grid.getGridMatch(true);
    if (newMatches.cellsToRemove.length > 0) {
      setTimeout(() => {
        this.matches = this.matches.concat(newMatches.matches);
      }, 500);
      setTimeout(() => {
        this.removeMatches(newMatches.cellsToRemove);
      }, 600);
    } else {
      this.grid.canMove = true;
    }
  }
}
