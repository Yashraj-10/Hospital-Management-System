import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ResetPasswordAdmin from './ResetPasswordDBA';
import { minWidth } from '@mui/system';
import axios from 'axios';
//no IE 11 support

const columns = [
  { 
    id: 'name', 
    label: 'Name', 
    minWidth: 170 
  },
  { 
    id: 'type', 
    label: 'Type', 
    minWidth: 100 
  },
  {
    id: 'user_id',
    label: 'Username',
    minWidth: 170
  },
  {
    id: 'ph_number',
    label: 'Contact No.',
    minWidth: 100
  },
  {
    id: 'psswd',
    label: '',
  },
  
  {
    id: 'del',
    label: '',
  }
];

function createData(name, type, user_id, ph_number) {
  return { name, type, user_id, ph_number};
}


export default function StickyHeadTable(props) {
  const rows = props.users;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleDelete = (e, userID) => {
    // console.log('delete called');
    axios.post('https://dbms-backend-api.azurewebsites.net/users/delete', {
              access_token: localStorage.getItem("access_token"),
              user_id: userID
          })
              .then(
                  (response) => {
                      // setPost(response.data);
                      // console.log(response.data);
                      alert(response.data.message);
                      window.location.reload();
                  },
                  (error) => {
                      // console.log(error);
                      alert(error.response.data.message);
                  }
              );
    // console.log(userID);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
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
                            column.id === 'psswd' ? <ResetPasswordAdmin user_id = {row.user_id}/> :
                            column.id === 'del' ? <IconButton aria-label="delete"><DeleteIcon onClick= {(e) => handleDelete(e,row.user_id)}/></IconButton> :
                            column.format && typeof value === 'number'
                            ? column.format(value)
                            : value
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