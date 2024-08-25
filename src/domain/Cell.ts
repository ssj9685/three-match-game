import { makeAutoObservable } from "mobx";
import blue from "@mui/material/colors/blue";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import red from "@mui/material/colors/red";
import yellow from "@mui/material/colors/yellow";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import green from "@mui/material/colors/green";
import brown from "@mui/material/colors/brown";
import purple from "@mui/material/colors/purple";
import lime from "@mui/material/colors/lime";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import amber from "@mui/material/colors/amber";
import BugReportIcon from "@mui/icons-material/BugReport";
import blueGrey from "@mui/material/colors/blueGrey";
import ExtensionIcon from "@mui/icons-material/Extension";
import { makeId } from "../utils/IdUtils";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export const blueCell = {
  name: "blue",
  backgroundColor: blue[500],
  color: blue[800],
  icon: InvertColorsIcon,
};

export const redCell = {
  name: "red",
  backgroundColor: red[500],
  color: yellow[500],
  icon: WhatshotIcon,
};

export const greenCell = {
  name: "green",
  backgroundColor: green[500],
  color: brown[500],
  icon: WhatshotIcon,
};

export const purpleCell = {
  name: "purple",
  backgroundColor: purple[500],
  color: lime[500],
  icon: BubbleChartIcon,
};

export const amberCell = {
  name: "amber",
  backgroundColor: amber[500],
  color: green[500],
  icon: BugReportIcon,
};

export const greyCell = {
  name: "grey",
  backgroundColor: blueGrey[500],
  color: amber[700],
  icon: ExtensionIcon,
};

export interface CellPart {
  name: string;
  backgroundColor: string;
  color: string;
  icon:
    | (OverridableComponent<SvgIconTypeMap<object, "svg">> & {
        muiName: string;
      })
    | undefined;
}

export interface CellInfo extends CellPart {
  id: string;
  x: number;
  y: number;
  zIndex: number;
  selected: boolean;
  canBeSelected: boolean;
  top: number;
  left: number;
}

export default class Cell implements CellInfo {
  id: string;
  x: number;
  y: number;
  zIndex: number;
  selected: boolean;
  canBeSelected: boolean;
  top: number;
  left: number;
  name: string = "";
  backgroundColor: string = "";
  color: string = "";
  icon;

  constructor(x: number, y: number, squareSize: number, color?: string) {
    makeAutoObservable(this);
    this.id = makeId(10);
    this.x = x;
    this.y = y;
    this.selected = false;
    this.canBeSelected = false;
    this.top = (squareSize - 1 - y) * 12.5;
    this.left = x * 12.5;
    this.zIndex = squareSize - 1 - y;
    if (color) {
      this.setColor(color);
    } else {
      this.name = "white";
      this.backgroundColor = "white";
      this.color = "black";
      this.icon = ExtensionIcon;
    }
  }

  copy(cell: Cell): Cell {
    this.id = cell.id;
    this.x = cell.x;
    this.y = cell.y;
    this.selected = cell.selected;
    this.canBeSelected = cell.canBeSelected;
    this.top = cell.top;
    this.left = cell.left;
    this.zIndex = cell.zIndex;
    this.name = cell.name;
    this.backgroundColor = cell.backgroundColor;
    this.color = cell.color;
    this.icon = cell.icon;
    return this;
  }

  setColor(color: string) {
    let data = null;
    switch (color) {
      case "blue":
        data = { ...blueCell };
        break;
      case "red":
        data = { ...redCell };
        break;
      case "green":
        data = { ...greenCell };
        break;
      case "purple":
        data = { ...purpleCell };
        break;
      case "amber":
        data = { ...amberCell };
        break;
      case "grey":
        data = { ...greyCell };
        break;
    }
    if (data !== null) {
      this.name = data.name;
      this.backgroundColor = data.backgroundColor;
      this.color = data.color;
      this.icon = data.icon;
    }
  }

  setPosition(x: number, y: number, squareSize: number) {
    this.x = x;
    this.y = y;
    this.top = (squareSize - 1 - y) * 12.5;
    this.left = x * 12.5;
    this.zIndex = squareSize - 1 - y;
    this.selected = false;
    this.canBeSelected = false;
  }
}
