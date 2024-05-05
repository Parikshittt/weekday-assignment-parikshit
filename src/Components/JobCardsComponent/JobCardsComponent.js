import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './JobCardsComponent.css'
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
import { TextField } from '@mui/material';

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
    'backend',
    'frontend',
    'fullstack',
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
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

const remoteOptions = [
    'remote',
    'hybrid',
    'in-office'
]

const basePayOptions = [
    '0',
    '10',
    '20',
    '30',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
    '100'
]


const JobCardsComponent = () => {



    function toTitleCase(str) {
        return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }

    const theme = useTheme();
    const [selectedRoles, setSelectedRoles] = React.useState([]);
    const [selectedEmployees, setSelectedEmployees] = React.useState('');
    const [selectedExperience, setSelectedExperience] = React.useState('');
    const [selectedRemoteOptions, setSelectedRemoteOptions] = React.useState([]);
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



    const handleChangeRemoteOptions = (event) => {
        const { value } = event.target;
        setSelectedRemoteOptions(value);
    };

    const handleChangeBasePay = (event) => {
        setSelectedBasePay(event.target.value)
    }

    const handleDelete = (index) => () => {
        setSelectedRoles((roles) => roles.filter((role, i) => i !== index));
    };

    const handleDeleteRemote = (index) => () => {
        setSelectedRemoteOptions((remote) => remote.filter((role, i) => i !== index));
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
        setSelectedRemoteOptions([])
    }

    const handleClearBasePay = () => {
        setSelectedBasePay('')
    }

    const handleSearchCompanyName = (event) => {
        setSearchCompanyName(event.target.value);
    };

    function getStyles(roleName, selectedRoles, theme) {
        return {
            fontWeight:
                selectedRoles.indexOf(roleName) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => {
                setJobs(data.jdList);
                setFilteredJobs(data.jdList); // Set filteredJobs after fetching data
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filterFunction = (filters) => {
        // Start with all jobs
        let filteredJobs = jobs;

        // Apply each filter
        if (filters.role && filters.role.length > 0) {
            filteredJobs = filteredJobs.filter(job => filters.role.includes(job.jobRole.toLowerCase()));
        }
        if (filters.xp) {
            filteredJobs = filteredJobs.filter(job => job.minExp >= filters.xp);
        }
        if (filters.remote && filters.remote.length > 0) {
            filteredJobs = filteredJobs.filter(job => filters.remote.includes(job.location.toLowerCase()));
        }
        if (filters.basePay) {
            filteredJobs = filteredJobs.filter(job => job.minJdSalary >= filters.basePay)
        }

        // Set the filtered jobs
        setFilteredJobs(filteredJobs);
    };

    useEffect(() => {
        const activeFilters = {
            role: selectedRoles,
            xp: selectedExperience,
            remote: selectedRemoteOptions,
            basePay: selectedBasePay
        };

        console.log('Active Filters:', activeFilters);
        filterFunction(activeFilters);
    }, [selectedRoles, selectedExperience, selectedRemoteOptions, selectedBasePay]);


    return (
        <div className="searchJobPage">
            {/* Filters Start */}
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
                                {option}&nbsp;year(s)
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: '10%' }}>
                    <InputLabel id="remote-label">Remote</InputLabel>
                    <Select
                        labelId="remote-label"
                        id="remote-select"
                        value={selectedRemoteOptions}
                        onChange={handleChangeRemoteOptions}
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
                    <InputLabel id="experience-label">Minimum Base Pay Range</InputLabel>
                    <Select
                        labelId="experience-label"
                        id="experience-select"
                        value={selectedBasePay}
                        onChange={handleChangeBasePay}
                        input={<OutlinedInput id="basePay-input" label="Minimum Base Pay Range" />}
                        endAdornment={
                            <IconButton onClick={handleClearBasePay} style={{ marginRight: 20, backgroundColor: '#00000030' }}>
                                <ClearIcon />
                            </IconButton>
                        }
                    >
                        {basePayOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}K&nbsp;USD
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
            {/* Filters End */}
            <div className='listOfJobCards' style={{ justifyContent: 'flex-start', gap: '10%', flexWrap: 'wrap' }}>
                {filteredJobs.map(job => (
                    <Card key={job.jdUid} className='individualJobCard' style={{ borderRadius: 20 }}>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" className='postedAgoPill'>
                                ⏳ Posted 10 days ago
                            </Typography>
                            <div className='companyLogoAndNameRole'>
                                <img src={job.logoUrl} alt="Company Logo" className='companyLogo' />
                                <div className='companyNameJobRole'>
                                    <Typography variant="h5" className='companyName'>{job.companyName}</Typography>
                                    <Typography variant="h6" className='jobRole'>{toTitleCase(job.jobRole)}</Typography>
                                </div>
                            </div>
                            <Typography variant="body1" style={{ marginLeft: 80, fontSize: 18 }}>{toTitleCase(job.location)}</Typography>
                            <Typography variant="body1" className='estimatedSalary'>
                                Estimated Salary : &nbsp;
                                {job.minJdSalary !== null ?
                                    `${job.minJdSalary}K - ${job.maxJdSalary}K ${job.salaryCurrencyCode}` :
                                    job.maxJdSalary !== null ?
                                        `${job.maxJdSalary}K ${job.salaryCurrencyCode}` :
                                        'Salary not specified'} ✅
                            </Typography>
                            <Typography variant="body1" className='aboutCompany'>About Company:</Typography>
                            <Typography variant="body1" className='aboutUs'>About us</Typography>
                            <Typography variant="body2" color="textSecondary" style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>
                                    <span style={{ opacity: 1, fontSize: 16 }}>{job.jobDetailsFromCompany.substring(0, 150)}</span>
                                    <span>
                                        {job.jobDetailsFromCompany.substring(150, 250).split('').map((char, index) => (
                                            <span key={index} style={{ opacity: 1 - (index / 100), fontSize: 16 }}>{char}</span>
                                        ))}
                                    </span>
                                </span>
                                {job.jobDetailsFromCompany.length > 250 &&
                                    <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', left: 0, right: 0, bottom: 200 }}>
                                        <Button className='viewJobButton' style={{ color: '#4F49DA' }}>View Job</Button>
                                    </div>
                                }
                            </Typography>

                            <Typography variant="body2" style={{ color: '#919191', fontWeight: 700, fontSize: 15, marginTop: 30 }}>
                                Minimum Experience<br />{job.minExp ? <span>{job.minExp} years</span> : <span>Not Specified</span>}
                            </Typography>
                            <Button variant="contained" style={{ width: '100%', height: '9%', fontSize: 18, marginTop: 10, backgroundColor: '#54EFC3', color: 'black', textTransform: 'capitalize' }}>
                                ⚡ Easy Apply
                            </Button>
                            <Button variant="contained" style={{ width: '100%', height: '9%', fontSize: 14, marginTop: 10, backgroundColor: '#4943DA', color: 'white', textTransform: 'capitalize' }}>
                                <img src="https://picsum.photos/200/200" alt="Placeholder" style={{ width: '10%', borderRadius: '50%', filter: 'blur(4px)', marginRight: '10px' }} />
                                <img src="https://picsum.photos/250/250" alt="Placeholder" style={{ width: '10%', borderRadius: '50%', filter: 'blur(4px)', marginRight: '10px' }} />
                                Unlock Referral Asks
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default JobCardsComponent;
