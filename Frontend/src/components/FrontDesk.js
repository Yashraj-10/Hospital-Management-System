import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import '../styles/frontDesk.css';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';

const images = [
    {
        url: 'https://media.istockphoto.com/id/1286945372/photo/gloved-hand-holds-clipboard-and-pen-and-fills-out-patient-registration-form.jpg?s=612x612&w=0&k=20&c=5TgIOGCOnsSbkQt6S5cDm1oYlCHMJ4bBnjtzI7osYSI=',
        title: 'Patient Registration',
        width: '20%',
    },
    {
        url: 'https://media.istockphoto.com/id/1241630232/photo/child-patient-with-iv-line-in-hand-sleep-on-hospital-bed-medical-palliation-healthcare-concept.jpg?s=612x612&w=0&k=20&c=LQ0j7rGcXW23t2bUmBJcM5xfbH_Vgy9nQjJld6W50LI=',
        title: 'Admit Patient',
        width: '20%',
    },
    {
        url: 'https://media.istockphoto.com/id/1294409857/photo/doctor-team-medicine.jpg?s=612x612&w=0&k=20&c=FuZwwi9a_SNCf18EWguZUoAX3gMW36oU8TH-lw9nyS4=',
        title: 'Discarge Patient',
        width: '20%',
    },
    {
        url: 'https://media.istockphoto.com/id/1071072540/photo/red-stethoscope-and-a-calendar-on-black-wood-surface.jpg?s=612x612&w=0&k=20&c=6YJkEL3mp9JR_7Dy0EUMH9oAIa7xNkPl9NMW4CkEVJE=',
        title: 'Schedule Appointment',
        width: '20%',
    },
    {
        url: 'https://media.istockphoto.com/id/637785818/photo/female-chemist-at-work-in-laboratory.jpg?s=612x612&w=0&k=20&c=fDO3EZkPvXTx-SxHSd6NkmXxNb5oqxqJooe-MKHw2iw=',
        title: 'Schedule Test',
        width: '20%',
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));
const FrontDesk = () => {
    const [isUser, setIsuser] = useState(false);

    const history = useHistory();
    const handleClick1 = (e, chooseOp) => {

        if (chooseOp === 'Patient Registration') {

            history.push('/register');
        }
        if (chooseOp === 'Admit Patient') {
            history.push('/admit');
        }
        if (chooseOp === 'Discarge Patient') {
            history.push('/discharge');
        }
        if (chooseOp === 'Schedule Appointment') {
            history.push('/scheduleappointment');
        }
        if (chooseOp === 'Schedule Test') {
            history.push('/scheduletest');
        }
    }

    useEffect(() => {
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "fdo") { setIsuser(true); }
    }, []);

    return (
        <div>
            {isUser &&
                <div className='vikasFdContainer'>
                    <p className='text-blk landing19-head'>
                        Front Desk Operator
                    </p>
                    <div className='vikasFdOpContainer'>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                            {images.map((image) => (
                                <ImageButton
                                    focusRipple
                                    key={image.title}
                                    style={{
                                        width: image.width,
                                        border: '1px solid white',
                                        fontSize: '40px'
                                    }}
                                    onClick={(e) => handleClick1(e, image.title)}
                                >
                                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                    <Image>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            sx={{
                                                position: 'relative',
                                                p: 4,
                                                pt: 2,
                                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                            }}
                                        >
                                            <div className='vikasImgTitle' >{image.title}</div>
                                            <ImageMarked className="MuiImageMarked-root" />
                                        </Typography>
                                    </Image>
                                </ImageButton>
                            ))}
                        </Box>
                    </div>
                </div>}
            {
                !isUser && <div className='notAuthorized'> <div class="w3-display-middle">
                    <h1 class="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
                    {/* <h class="w3-border-white w3-animate-left" style="margin:auto;width:50%"> */}
                    <h3 class="w3-center w3-animate-right">You dont have permission to view this page.</h3>
                    <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
                    <h6 class="w3-center w3-animate-zoom">error code:403 forbidden</h6>
                </div></div>
            }
        </div>
    );
}

export default FrontDesk;
