import ModalB from 'react-bootstrap/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { INewInputs } from '../../interfaces/NewInputs';

function Modal({ show, onHide, columns }: { show: boolean, onHide: () => void, columns: GridColDef[] }) {
    const [newInputs, setNewInputs] = useState<INewInputs[]>([]);

    const handleAddInput = () => {
        const availableColumns = columns
            .filter((_, index) => index > 4)
            .filter(col => !newInputs.some(input => input.column.field === col.field));
        if (availableColumns.length > 0) {
            setNewInputs(prev => [
                ...prev,
                { column: availableColumns[0], textValue: '' },
            ]);
        }
    };

    const handleTextChange = (index: number, value: string) => {
        const updatedInputs = [...newInputs];
        updatedInputs[index].textValue = value; 
        setNewInputs(updatedInputs);
    };

    const handleSelectChange = (index: number, value: string) => {
        const updatedInputs = [...newInputs];
        const selectedColumn = columns.find(col => col.field === value);
        if (selectedColumn) {
            updatedInputs[index].column = selectedColumn;
            setNewInputs(updatedInputs);
        }
    };

    return (
        <ModalB
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalB.Header className='d-flex justify-content-between align-items-center'>
                <ModalB.Title id="contained-modal-title-vcenter">
                    Edit Note
                </ModalB.Title>
                <IconButton aria-label="delete" onClick={onHide}>
                    <CloseIcon />
                </IconButton>
            </ModalB.Header>
            <ModalB.Body style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
                {columns.map((column, index) => (
                    index <= 4 && (
                        <div className="col-12 d-flex justify-content-between align-items-center m-2 gap-5" key={index}>
                            <TextField
                                required
                                id="outlined-required"
                                defaultValue={column.headerName}
                                disabled
                                className='w-50'
                            />
                            <TextField
                                required
                                className='w-50'
                                id="outlined-required"
                                label={column.headerName}
                            />
                        </div>
                    )
                ))}

                {newInputs.map((input, index) => (
                    (newInputs.length + 5) == columns.length ?
                    <div className="col-12 d-flex justify-content-between align-items-center m-2 gap-5" key={index}>
                    <TextField
                        required
                        id="outlined-required"
                        defaultValue={input.column.headerName}
                        disabled
                        className='w-50'
                    />
                    <TextField
                        required
                        className='w-50'
                        id="outlined-required"
                        label={input.column.headerName}
                    />
                </div>
                    : <div className="col-12 d-flex justify-content-between align-items-center m-2 gap-5" key={index}>
                    <FormControl className='w-50'>
                        <InputLabel id={`select-label-${index}`}>{input.column.headerName}</InputLabel>
                        <Select
                            labelId={`select-label-${index}`}
                            id={`select-${index}`}
                            value={input.column.field}
                            label={input.column.headerName}
                            
                            onChange={(e) => handleSelectChange(index, e.target.value)}
                        >
                            {columns.filter((_, colIndex) => colIndex > 4 && !newInputs.some(i => i.column.field === columns[colIndex].field))
                                .map(col => (
                                    <MenuItem key={col.field} value={col.field}>{col.headerName}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <TextField
                        className='w-50'
                        id={`text-input-${index}`}
                        label={input.column.headerName}
                        value={input.textValue}
                        onChange={(e) => handleTextChange(index, e.target.value)}
                    />
                </div>
                ))}

                <div className="col-12 w-100 d-flex justify-content-end align-items-center mt-2 pe-5">
                    <Button
                        onClick={handleAddInput}
                        variant="outlined"
                        endIcon={<AddIcon />}
                        sx={{
                            color: '#939D9D',
                            border: '2px dashed',
                            borderColor: '#939D9D',
                            '&:hover': {
                                borderColor: '#7B8383',
                            },
                        }}
                        disabled={columns.length === newInputs.length + 5}
                    >
                        Add column
                    </Button>
                </div>
            </ModalB.Body>

            <ModalB.Footer>
                <Button variant="contained" color="success">Save</Button>
            </ModalB.Footer>
        </ModalB>
    );
}

export default Modal;
