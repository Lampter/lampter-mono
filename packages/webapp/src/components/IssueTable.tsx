import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Table,
  TablePagination,
  TableBody,
  TableHead,
  Paper,
  TableCell,
  TableRow,
  IconButton,
} from "@material-ui/core";
import { Issues } from "../types/Issues";

type OwnProps = {
  issues: Issues["issues"];
};

type Props = OwnProps;

const IssueTable: React.FC<Props> = props => {
  const { issues } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleClick = (_: React.MouseEvent) => {};

  function handleChangePage(
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(e: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+e.target.value);
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, issues.length - page * rowsPerPage);

  return (
    <Paper>
      <Table aria-labelledby="issues" padding="default">
        <TableHead>
          <TableRow>
            <TableCell align="left" variant="head">
              Title
            </TableCell>
            <TableCell align="left" variant="head">
              &nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map(issue => (
            <TableRow
              hover
              onClick={e => handleClick(e)}
              tabIndex={-1}
              key={issue.id}
            >
              <TableCell>{issue.title}</TableCell>
              <TableCell padding="none" align="center">
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={issues.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default IssueTable;
