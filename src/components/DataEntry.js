import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import '../styles/frontDesk.css';
import { useHistory } from "react-router-dom";

const handleSubmit = (e) => {
        e.preventDefault();
const images = [
    {
        url: 'https://media.istockphoto.com/id/512298876/photo/blood-test-blood-samples-on-a-laboratory-form.jpg?s=612x612&w=0&k=20&c=jAIbqNGEfh58Zz8TB86yr1-0cg8W6zp6iRPnxQ3mSNA=',
        title: 'Add Test Results',
        width: '40%',
    },
    {
        url: 'https://media.istockphoto.com/id/1321691597/photo/professional-black-head-nurse-wearing-face-mask-does-checkup-of-patients-vitals-checking.jpg?s=612x612&w=0&k=20&c=UFR2k11TsO4stc8Lj23KGniOAgXMx3IeIF5mqJC4KLU=',
        title: 'Add Treatments',
        width: '40%',
    },
    
];
const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    marginRight: '5%',
    marginLeft: '5%',
    height: 250,
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

const DataEntry = () => {
    const history = useHistory();
    const handleClick = (event, chooseOp) => {
        if(chooseOp === 'Add Test Results'){
            history.push('/addtestresults');
        }
        else if(chooseOp === 'Add Treatments'){
            history.push('/addtreatments');
        }
    }

    return ( 
        <div className="vikasDataEntryContainer">
            <p className='text-blk landing19-head'>
            Data Entry Operator
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
                                fontSize: '100px'
                            }}
                            onClick={(e) => handleClick(e, image.title)}
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
        </div>
     );
}
 
export default DataEntry;