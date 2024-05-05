import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './JobCardsComponent.css'

const JobCardsComponent = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => setJobs(data.jdList))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    function toTitleCase(str) {
        return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }

    return (


        <div className='listOfJobCards'>
            {jobs.map(job => (
                <Card key={job.jdUid} className='individualJobCard'>
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
                        <Typography variant="body2" color="textSecondary">
                            {job.jobDetailsFromCompany.substring(0, 150)} {/* Display first 150 characters */}
                            {job.jobDetailsFromCompany.length > 150 && <Button color="primary">View Job</Button>}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Minimum Experience: {job.minExp} years
                        </Typography>
                        <Button variant="contained" color="primary">
                            Easy Apply
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default JobCardsComponent;
