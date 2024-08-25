import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { observer } from "mobx-react-lite";
import Message from "../domain/Message";
import rootStore from "../store/RootStore";

const useStyles = makeStyles({
  card: {
    height: "auto",
    maxHeight: "548px",
    overflow: "hidden",
  },
  logs: {
    overflowY: "scroll",
    height: "auto",
    maxHeight: "495px",
  },
});

export const LogSideCard = observer(() => {
  const { allMessages } = rootStore.messageStore;
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={12}>
      <Card className={classes.card} elevation={4}>
        <CardContent>
          <Typography variant={"h5"} component={"h2"}>
            Log
          </Typography>
          <div className={classes.logs}>
            {allMessages.map((m: Message) => (
              <Typography variant={"body1"} key={m.id}>
                {m.toString()}
              </Typography>
            ))}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
});

export default LogSideCard;
