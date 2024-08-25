import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import ReplayIcon from "@mui/icons-material/Replay";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import rootStore from "../store/RootStore";

const useStyles = makeStyles({
  card: {
    height: "auto",
    maxHeight: "548px",
    overflow: "hidden",
  },
  button: {
    margin: "0 10px",
  },
});

export default function ActionMenu() {
  const classes = useStyles();
  const { reset } = rootStore.gridStore;

  return (
    <Grid item xs={12} sm={6} md={12}>
      <Card className={classes.card} elevation={4}>
        <CardContent>
          <Typography variant={"h5"} component={"h2"}>
            Actions
          </Typography>
          <div>
            <Fab
              onClick={reset}
              color="primary"
              aria-label="new"
              className={classes.button}
            >
              <ReplayIcon />
            </Fab>
            <Fab
              color="primary"
              aria-label="hint"
              className={classes.button}
              disabled={true}
            >
              <EmojiObjectsIcon />
            </Fab>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
