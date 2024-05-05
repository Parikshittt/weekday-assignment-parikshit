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
        <div className='listOfJobCards' style={{ justifyContent: 'flex-start', gap: '10%', flexWrap: 'wrap' }}>
            {jobs.map(job => (
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
                                <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', left: 0, right: 0, top: '72%' }}>
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
    );
};

export default JobCardsComponent;
