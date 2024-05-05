import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Input, TextField } from '@mui/material';
import { InputOutlined, InputRounded } from '@mui/icons-material';

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

const roleNames = [
    'Backend',
    'Frontend',
    'Fullstack',
];

const employeeOptions = [
    '1-10',
    '11-20',
    '21-50',
    '51-100',
    '101-200',
    '201-500',
    '500+'
];

const experienceOptions = [
    '1 year',
    '2 years',
    '3 years',
    '4 years',
    '5 years',
    '6 years',
    '7 years',
    '8 years',
    '9 years',
    '10+ years'
];

const remoteOptions = [
    'Remote',
    'Hybrid',
    'In-Office'
]

const basePayOptions = [
    '0L',
    '10L',
    '20L',
    '30L',
    '40L',
    '50L',
    '60L',
    '70L'
]

function getStyles(roleName, selectedRoles, theme) {
    return {
        fontWeight:
            selectedRoles.indexOf(roleName) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function FilterComponent() {
    const theme = useTheme();
    const [selectedRoles, setSelectedRoles] = React.useState([]);
    const [selectedEmployees, setSelectedEmployees] = React.useState('');
    const [selectedExperience, setSelectedExperience] = React.useState('');
    const [remote, setRemoteOptions] = React.useState([])
    const [selectedBasePay, setSelectedBasePay] = React.useState('');
    const [searchCompanyName, setSearchCompanyName] = React.useState('');

    const handleChangeRoles = (event) => {
        const { target: { value } } = event;
        setSelectedRoles(typeof value === 'string' ? value.split(',') : value);
    };

    const handleChangeEmployees = (event) => {
        setSelectedEmployees(event.target.value);
    };

    const handleChangeExperience = (event) => {
        setSelectedExperience(event.target.value);
    };

    const handleChangeRemote = (event) => {
        setRemoteOptions(event.target.value)
    }

    const handleChangeBasePay = (event) => {
        setSelectedBasePay(event.target.value)
    }

    const handleDelete = (index) => () => {
        setSelectedRoles((roles) => roles.filter((role, i) => i !== index));
    };

    const handleDeleteRemote = (index) => () => {
        setRemoteOptions((roles) => roles.filter((role, i) => i !== index));
    };

    const handleClearRoles = () => {
        setSelectedRoles([]);
    };

    const handleClearEmployees = () => {
        setSelectedEmployees('');
    };

    const handleClearExperience = () => {
        setSelectedExperience('');
    };

    const handleClearRemote = () => {
        setRemoteOptions([])
    }

    const handleClearBasePay = () => {
        setSelectedBasePay('')
    }

    const handleSearchCompanyName = (event) => {
        setSearchCompanyName(event.target.value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <FormControl sx={{ m: 1, minWidth: '15%' }}>
                <InputLabel id="roles-label">Roles</InputLabel>
                <Select
                    labelId="roles-label"
                    id="roles-select"
                    multiple
                    value={selectedRoles}
                    onChange={handleChangeRoles}
                    input={<OutlinedInput id="roles-input" label="Roles" />}
                    endAdornment={
                        <IconButton onClick={handleClearRoles} style={{ marginRight: 20, backgroundColor: '#00000030' }}>
                            <ClearIcon />
                        </IconButton>
                    }
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', gap: 0.5, flexDirection: 'row', alignItems: 'center' }}>
                            {selected.map((value, index) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    onDelete={handleDelete(index)}
                                    deleteIcon={
                                        <div
                                            onMouseDown={(event) => {
                                                event.stopPropagation();
                                                handleDelete(value)();
                                            }}
                                        >
                                            <CloseIcon />
                                        </div>
                                    }
                                    style={getStyles(value, selectedRoles, theme)}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {roleNames.map((roleName) => (
                        <MenuItem
                            key={roleName}
                            value={roleName}
                            style={getStyles(roleName, selectedRoles, theme)}
                        >
                            {roleName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: '15%' }}>
                <InputLabel id="employees-label">Employees</InputLabel>
                <Select
                    labelId="employees-label"
                    id="employees-select"
                    value={selectedEmployees}
                    onChange={handleChangeEmployees}
                    input={<OutlinedInput id="employees-input" label="Employees" />}
                    endAdornment={
                        <IconButton onClick={handleClearEmployees} style={{ marginRight: 20, backgroundColor: '#00000030' }}>
                            <ClearIcon />
                        </IconButton>
                    }
                >
                    {employeeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: '15%' }}>
                <InputLabel id="experience-label">Experience</InputLabel>
                <Select
                    labelId="experience-label"
                    id="experience-select"
                    value={selectedExperience}
                    onChange={handleChangeExperience}
                    input={<OutlinedInput id="experience-input" label="Experience" />}
                    endAdornment={
                        <IconButton onClick={handleClearExperience} style={{ marginRight: 20, backgroundColor: '#00000030' }}>
                            <ClearIcon />
                        </IconButton>
                    }
                >
                    {experienceOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: '10%' }}>
                <InputLabel id="remote-label">Remote</InputLabel>
                <Select
                    labelId="remote-label"
                    id="remote-select"
                    value={remote}
                    onChange={handleChangeRemote}
                    multiple
                    input={<OutlinedInput id="remote-input" label="Remote" />}
                    endAdornment={
                        <IconButton onClick={handleClearRemote} style={{ marginRight: 20, backgroundColor: '#00000030' }}>
                            <ClearIcon />
                        </IconButton>
                    }

                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', gap: 0.5, flexDirection: 'row', alignItems: 'center' }}>
                            {selected.map((value, index) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    onDelete={handleDeleteRemote(index)}
                                    deleteIcon={
                                        <div
                                            onMouseDown={(event) => {
                                                event.stopPropagation();
                                                handleDeleteRemote(value)();
                                            }}
                                        >
                                            <CloseIcon />
                                        </div>
                                    }
                                    style={getStyles(value, selectedRoles, theme)}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {remoteOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: '20%' }}>
                <InputLabel id="experience-label">Select Base Pay Range</InputLabel>
                <Select
                    labelId="experience-label"
                    id="experience-select"
                    value={selectedBasePay}
                    onChange={handleChangeBasePay}
                    input={<OutlinedInput id="basePay-input" label="Select Base Pay Range" />}
                    endAdornment={
                        <IconButton onClick={handleClearBasePay} style={{ marginRight: 20, backgroundColor: '#00000030' }}>
                            <ClearIcon />
                        </IconButton>
                    }
                >
                    {experienceOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box

                component="form"
                sx={{
                    '& > :not(style)': { m: 1, minWidth: '10%' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Search Company Name" variant="outlined" onChange={handleSearchCompanyName} />
            </Box>
        </div>
    );
}
