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
import FormDialogTreatment from './DoctorTreatmentPopup';
import FormDialogDrug from './DoctorDrugPopup';
import { useHistory } from 'react-router-dom';

const columns = [
  { 
    id: 'patient_name', 
    label: 'Name', 
    minWidth: 150
  },
  {
    id: 'age',
    label: 'Age',
    format: (value) => value.toFixed(0),
  },
  {
    id: 'conditions', 
    label: 'Conditions', 
    minWidth: 150
  },
  {
    id: 'adddrugs',
    label: '',
    minWidth: 150
  },
  {
    id: 'treatment',
    label: 'Treatments',
    minWidth: 150
  },
  {
    id: 'addtreatments',
    label: '',
    minWidth: 150
  }
];

function createData(name, age, condition, treatments, adddrugs, addtreatments) {
    return { name, age, condition, adddrugs, treatments, addtreatments};
}

// const rows = [
  
// ];

export default function StickyHeadTable(props) {
  const rows = props.patients;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const history = useHistory();
  const handlePatientDetails = () => {
    history.push('/patient_details');
  }

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
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
                            value === '' ? <p>{"—"}</p> :
                            column.id === 'patient_name' ? <Button onClick={handlePatientDetails}>{value}</Button> :
                            column.id === 'adddrugs' ? <FormDialogDrug /> :
                            column.id === 'addtreatments' ? <FormDialogTreatment /> :
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
  );
}