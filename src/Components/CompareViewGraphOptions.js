// CompareViewGraphOptions
import * as React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, InputLabel, OutlinedInput, MenuItem, FormControl, Select, Checkbox, ListItemText } from "@mui/material";
import { cleanOptionName } from '../assets/data/functions';

export default function CompareViewGraphOptions({ open, handleClose, handleDropdownChange, selectedOption, onCompareClick, names }) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    // const clearOptionName = (option) => {
    //     if (typeof option !== 'string') {
    //       option = String(option);
    //     }
    //     return option.replace(/tri__/g, ' ').replace(/_/g, ' ');
    //   };
    return (
        <div>
            <Dialog disableEscapeKeyDown open={open} onClose={()=>handleClose()}>
                <DialogTitle>Compare stocks</DialogTitle>
                <FormControl sx={{ m: 2, width: 280 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Stocks</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedOption}
                        onChange={handleDropdownChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.map(item => cleanOptionName(item)).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {/* .filter(name => !mainOption.includes(name)) */}
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={selectedOption.indexOf(name) > -1} />
                                <ListItemText primary={cleanOptionName(name)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <DialogActions>
                    <Button onClick={()=>onCompareClick()}>Compare</Button>
                    <Button onClick={()=>handleClose()}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}