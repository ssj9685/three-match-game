import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Nav() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Puzzle Match-3</Typography>
      </Toolbar>
    </AppBar>
  );
}
