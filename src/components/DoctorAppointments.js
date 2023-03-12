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
import Button from '@mui/material/Button';
import FormDialogTreatment from './DoctorTreatmentPopup';


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
  {
    id : 'status',
    label : 'Status',
    minWidth : 150
  }
];


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
                      const treat_id = row['doc_appointment_id'];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            // column.id === 'status' && column['today'] == 1 ? <FormDialogTreatment id={column['doc_appointment_id']}/> :
                            column.id === 'status' && row['today'] === 1 ? <FormDialogTreatment id={treat_id}/> :
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