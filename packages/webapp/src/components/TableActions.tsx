import React from "react";
import {
  Theme,
  makeStyles,
  MenuItem,
  Menu,
  Button,
  TextField,
  InputAdornment,
  ListItemText
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    display: "grid",
    alignItems: "center",
    gridGap: `${theme.spacing(1)}px`,
    gridAutoFlow: "column"
  },
  iconRight: {
    marginLeft: theme.spacing(0.5)
  }
}));

type OwnProps = {};

type Props = OwnProps;

const TableActions: React.FC<Props> = () => {
  const classes = useStyles();

  const [search, setSearch] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState();

  const handleSortByClicked = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSortByClosed = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.actions}>
      <TextField
        variant="outlined"
        fullWidth
        value={search}
        margin="none"
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="disabled" />
            </InputAdornment>
          )
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <div>
        <Button
          onClick={handleSortByClicked}
          color="primary"
          size="medium"
          variant="outlined"
          aria-controls="issues-sort"
          aria-haspopup="true"
        >
          Sort By
          <KeyboardArrowDownIcon className={classes.iconRight} />
        </Button>
        <Menu
          id="issues-sort"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSortByClosed}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <MenuItem value={10}>
            <ListItemText primary="Status" />
          </MenuItem>
          <MenuItem value={10}>
            <ListItemText primary="Name" />
          </MenuItem>
          <MenuItem value={10}>
            <ListItemText primary="Last Deployed" />
          </MenuItem>
          <MenuItem value={10}>
            <ListItemText primary="Last Updated" />
          </MenuItem>
          <MenuItem value={10}>
            <ListItemText primary="Last Created" />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default TableActions;
