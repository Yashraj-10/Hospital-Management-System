import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import '../styles/DocApmts.css';

const columns = [
  { 
    id: 'name', 
    label: 'Test Name', 
    minWidth: 150
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 150
  },
  {
    id: 'results',
    label: 'Results',
    minWidth: 150
  },
  {
    id: 'comments',
    label: 'Comments',
    minWidth: 150
  },
  {
    id: 'report',
    label: 'Test Report',
    minWidth: 150
  },
];

function createData(name, date, results, comments, report) {
    return { name, date, results, comments, report};
}

const rows = [
  createData('Nirbhay','40/2/13', 'bawasir', 'bad'),
  createData('Pranil','16/8/10', 'pregnancy', 'bad'),
  createData('Vikas','20/5/12', 'food poisoning', 'bad')
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className='astitvaApmtsTable'>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 200 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            column.id === 'report' ? <Button variant="contained">View</Button> :
                            column.format && typeof value === 'number' ? column.format(value) : value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Paper>
  );
}