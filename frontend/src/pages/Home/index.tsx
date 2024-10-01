import { INoteApi } from '../../interfaces/ApiResponse';
import { useAppSelector } from '../../store/hooks';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import styles from './index.module.sass';
import AddIcon from '@mui/icons-material/Add';
import {  Button } from '@mui/material';
import { useState } from 'react';
import Modal from '../../components/Modal';
function Home() {
  
    const {  loading }: { notes: INoteApi[]; loading: boolean } = useAppSelector(
        state => state.notes,
      );
      const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'surname', headerName: 'Surname', width: 130 },
        { field: 'fname', headerName: 'ffdzsf', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'email',
          headerName: 'Email',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
        },
        {
          field: 'number',
          headerName: 'Phone number',
          type: 'number',
          width: 31,
        },
        {
          field: 'message',
          headerName: 'Message',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 255,
        },
      ];
    const paginationModel = { page: 0, pageSize: 7 };
    const rows = [
      { id: 1, name: 'Snow', surname: 'Jon', age: 35 },
      { id: 2, name: 'Lannister', surname: 'Cersei', age: 42 },
      { id: 3, name: 'Lannister', surname: 'Jaime', age: 45 },
      { id: 4, name: 'Stark', surname: 'Arya', age: 16 },
      { id: 5, name: 'Targaryen', surname: 'Daenerys', age: 12 },
      { id: 6, name: 'Melisandre', surname: null, age: 150 },
      { id: 7, name: 'Clifford', surname: 'Ferrara', age: 44 },
      { id: 8, name: 'Frances', surname: 'Rossini', age: 36 },
      { id: 9, name: 'Roxie', surname: 'Harvey', age: 65 },
    ];
    const [modalShow, setModalShow] = useState(false);
    const handleClick = () => setModalShow(true);
  return (
    <div className={`${styles.wrapper} bg-dark`}>
    <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        columns={columns}
      />
      <div className="container">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col-12">
          <Paper sx={{ height: 500, width: '100%' }} className='table'>
  {
      loading ? <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width='100%'
      height='100%'
    /> : 
        <DataGrid
       rows={rows}
       columns={columns}
       initialState={{ pagination: { paginationModel } }}
       pageSizeOptions={[7, 14]}
       checkboxSelection
       sx={{ border: 0 }}
     />
        }
  </Paper>

          </div>
          <div className="row">
            <div className="col-lg-9"></div>
            <div className="col-lg-2 col-12 p-2 h-100">
                <Button
                variant="contained"
                style={{backgroundColor: '#3E75C2'}}
                className='w-100'
                endIcon={<AddIcon />}
                onClick={handleClick}>
                    Add Note
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Home;
