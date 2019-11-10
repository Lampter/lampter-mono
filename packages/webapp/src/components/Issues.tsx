import React from "react";
import IssueTable from "./IssueTable";
import { useQuery } from "@apollo/react-hooks";
import {
  Typography,
  Theme,
  makeStyles,
  Chip,
  IconButton,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import TableActions from "./TableActions";
import { gql } from "apollo-boost";

export const ISSUES = gql`
  query Issues {
    issues {
      id
      title
      body
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2, 4),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  headerText: {
    display: "flex",
    alignItems: "center",
  },
  headerBack: {
    marginRight: theme.spacing(1),
  },
  actions: {
    display: "grid",
    alignItems: "center",
    gridGap: `${theme.spacing(1)}px`,
    gridAutoFlow: "column",
  },
  chip: {
    marginLeft: theme.spacing(1),
  },
  iconRight: {
    marginLeft: theme.spacing(0.5),
  },
}));

type OwnProps = {};

type Props = OwnProps;

const Issues: React.FC<Props> = () => {
  const classes = useStyles();

  const { data: { issues = [] } = {} } = useQuery(ISSUES);

  const handleBackClicked = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.headerText}>
          <IconButton
            onClick={handleBackClicked}
            className={classes.headerBack}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography variant="h6">Issues</Typography>
          <Chip
            label={issues.length}
            color="primary"
            className={classes.chip}
          />
        </div>
        <TableActions />
      </div>
      <IssueTable issues={issues} />
    </div>
  );
};

export default Issues;
