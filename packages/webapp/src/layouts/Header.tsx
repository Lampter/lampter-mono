import * as React from "react";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import {
  Theme,
  Avatar,
  ListItemText,
  MenuItem,
  Menu,
  IconButton
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: theme.spacing(3),
    height: 0 // See: https://github.com/philipwalton/flexbugs/issues/197
  },
  titleContainer: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0, 5),
    height: "100%"
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginLeft: theme.spacing(1)
  },
  links: {
    height: "100%",
    display: "grid",
    gridAutoFlow: "column",
    gridGap: `${theme.spacing(6)}px`,
    alignItems: "center"
  },
  link: {
    ...theme.typography.body2,
    textDecoration: "none",
    color: theme.palette.grey[400],
    fontWeight: "bold",
    "&:hover": {
      color: "white"
    },
    "&:focus": {
      color: "white"
    },
    "&:active": {
      color: "white"
    }
  },
  linkActive: {
    color: "white"
  },
  endActions: {
    display: "grid",
    gridGap: `${theme.spacing(3)}px`,
    gridAutoFlow: "column",
    color: "white",
    alignItems: "center"
  },
  iconActions: {
    marginRight: theme.spacing(2)
  },
  userName: {
    fontWeight: "bold"
  },
  avatar: {
    cursor: "pointer",
    backgroundColor: theme.palette.grey[600],
    "&:hover": {
      backgroundColor: theme.palette.grey[500]
    }
  },
  avatarIcon: {
    color: "white"
  }
}));

type Props = {};

const Header: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState();

  const handleTitleClicked = () => {
    history.push("/");
  };

  const handleMenuClicked = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClosed = () => {
    setAnchorEl(null);
  };

  const handleLogoutClicked = async () => {
    setAnchorEl(null);
    // client.resetStore();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar className={classes.toolbar} disableGutters>
        <div className={classes.links}>
          <div className={classes.titleContainer} onClick={handleTitleClicked}>
            Lampter
          </div>
        </div>
        <div className={classes.endActions}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar
            className={classes.avatar}
            aria-controls="header-menu"
            onClick={handleMenuClicked}
          >
            <PersonIcon className={classes.avatarIcon} />
          </Avatar>
          <Menu
            id="header-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClosed}
            getContentAnchorEl={null}
            MenuListProps={{
              disablePadding: true
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <MenuItem onClick={handleLogoutClicked}>
              <ListItemText primary="Log Out" />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
