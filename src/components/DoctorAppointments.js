import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../styles/DocApmts.css';

const columns = [
  { 
    id: 'patient_name', 
    label: 'Patient\'s Name', 
    minWidth: 150
  },
  {
    id: 'start_time',
    label: 'Date',
    minWidth: 150
  },
  {
    id: 'age', 
    label: 'Age',
    minWidth: 150
  },
  {
    id: 'doc_appointment_id',
    label: 'Appointment Id',
    minWidth: 150
  },
  {
    id: 'gender',
    label: 'Gender',
    minWidth: 150
  },
];



// const rows = [
//   createData('Nirbhay','40/2/13', 'bawasir', 'bad', 'surgery'),
//   createData('Pranil','16/8/10', 'pregnancy', 'bad', 'surgery'),
//   createData('Vikas','20/5/12', 'food poisoning', 'bad', 'surgery'),
//   createData('Nirbhay','40/2/13', 'bawasir', 'bad', 'surgery'),
//   createData('Pranil','16/8/10', 'pregnancy', 'bad', 'surgery'),
//   createData('Vikas','20/5/12', 'food poisoning', 'bad', 'surgery'),
//   createData('Nirbhay','40/2/13', 'bawasir', 'bad', 'surgery'),
//   createData('Pranil','16/8/10', 'pregnancy', 'bad', 'surgery'),
//   createData('Vikas','20/5/12', 'food poisoning', 'bad', 'surgery'),
//   createData('Nirbhay','40/2/13', 'bawasir', 'bad', 'surgery'),
//   createData('Pranil','16/8/10', 'pregnancy', 'bad', 'surgery'),
//   createData('Vikas','20/5/12', 'food poisoning', 'bad', 'surgery'),
// ];
// Array [ {…} ]
// ​
// 0: Object { doc_appointment_id: "DA1", end_time: "2023-03-06 11:15:00", patient_name: "Basti", … }
// ​​
// doc_appointment_id: "DA1"
// ​​
// end_time: "2023-03-06 11:15:00"
// ​​
// gender: null
// ​​
// patient_name: "Basti"
// ​​
// start_time: "2023-03-06 11:00:00"  ​​  
// ​​
// <prototype>: Object { … }
// ​
// length: 1
// ​
// <prototype>: Array []

export default function DoctorTodayApmts(props) {
  const rows = props.appointments;
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
    <Paper sx={{ width: '120%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 550 }}>
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
        rowsPerPageOptions={[10, 25, 100]}
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