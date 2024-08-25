import { observer } from "mobx-react-lite";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import RoundCell from "./RoundCell";
import rootStore from "../store/RootStore";

const useStyles = makeStyles({
  column: {
    width: "68px",
    margin: "auto",
  },
  paper: {
    width: "100%",
    padding: "10px",
    overflow: "hidden",
  },
  container: {
    position: "relative",
    width: "100%",
    paddingTop: "100%",
    margin: "auto",
  },
});

export const GameGrid = observer(() => {
  const classes = useStyles();
  const { info, select } = rootStore.gridStore;
  return (
    <Grid item xs={12} md={8}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          {info.grid.cells.map((cellInfo) => {
            if (cellInfo !== null) {
              return (
                <RoundCell
                  key={cellInfo.id}
                  backgroundColor={cellInfo.backgroundColor}
                  color={cellInfo.color}
                  selected={cellInfo.selected || false}
                  x={cellInfo.x}
                  y={cellInfo.y}
                  top={cellInfo.top}
                  left={cellInfo.left}
                  zIndex={cellInfo.zIndex}
                  icon={cellInfo.icon}
                  select={select}
                />
              );
            } else {
              return "";
            }
          })}
        </div>
      </Paper>
    </Grid>
  );
});

export default GameGrid;
