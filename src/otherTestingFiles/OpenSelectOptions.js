import * as React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, InputLabel, OutlinedInput, MenuItem, FormControl, Select, Checkbox, ListItemText } from "@mui/material";

export default function DialogSelect({ open, handleClose, handleDropdownChange, selectedOption, mainOption, onViewClick, onCompareClick }) {
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

    const names = [
        'tri__Nifty_50',
        'tri__Nifty_Midcap_50',
        'tri__NIFTY_SMLCAP_50',
        "tri__NIFTY_LARGEMIDCAP_250",
    ];

    return (
        <div>
            <Dialog disableEscapeKeyDown open={open} onClose={() => handleClose()}>
                <DialogTitle>Add stocks</DialogTitle>
                <FormControl sx={{ m: 2, width: 350 }}>
                        <InputLabel id="demo-multiple-checkbox-label" >Stocks</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedOption}
                        onChange={handleDropdownChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.filter(name => !mainOption.includes(name)).map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={selectedOption.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DialogActions>
                    <Button onClick={() => onViewClick()}>View</Button>
                    <Button onClick={() => onCompareClick()}>Compare</Button>
                    <Button onClick={() => handleClose()}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

{/* <input type='search' list='lang' 
                    onChange={handleDropdownChange}
                    value={selectedOption.join(', ')}
                    />
                        <datalist id='lang'>
                        {names.filter(name => !mainOption.includes(name)).map((name, index) => (
                        <option value={name} key={index}>{name}</option>
                    ))}
                        </datalist> */}

        // 'tri__Nifty_Next_50',
        // 'tri__NIFTY_MIDCAP_100',
        // 'tri__NIFTY_SMLCAP_100',
        // 'Nifty_100',
        // 'Nifty_200',
        // 'NIFTY_MICROCAP_250',
        // 'NIFTY_TOTAL_MARKET',
        // "tri__NIFTY_MIDCAP_150",
        // "tri__NIFTY_MIDSMALLCAP_400",
        // "tri__NIFTY_500",
        // "tri__NIFTY_SMALLCAP_250",
        // "tri__NIFTY_SMALLCAP_50",
        // "tri__NIFTY_SMALLCAP_100",