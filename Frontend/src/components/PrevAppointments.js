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
import axios from 'axios';
import '../styles/register.css';


const columns = [
  { 
    id: 'doc_name', 
    label: 'Doctor Name', 
    minWidth: 150
  },
  {
    id : 'docType',
    label : 'Type',
    minWidth: 150
  },
  {
    id : 'doc_email',
    label : 'email',
    minWidth : 150
  },
  {
    id : 'doc_number',
    label : 'Ph. Number',
    minWidth : 150
  },
  {
    id: 'start_time',
    label: 'Date',
    minWidth: 150
  },
  {
    id: 'symptoms',
    label: 'Symptoms',
    minWidth: 150
  },
  {
    id: 'treatment',
    label: 'Treatments',
    minWidth: 150
  },
];



export default function StickyHeadTable(props) {
  var appointments = props.data;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [post, setPost] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
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
            {appointments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const app_id = row['doc_appointment_id'];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
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
        count={appointments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Paper>
    </div>
  );
}