import * as React from 'react';
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import bgstrip from "../assets/images/bgstrip.jpg";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function CardComponent() {
    return (
        <Card sx={{ minWidth: 275,
            '&:hover': {
                background: 'linear-gradient(to bottom, #e6dede, white)',
            },
             }}>
            <CardContent>
                <Typography 
                sx={{ width: "100%", height: "2.5rem", backgroundImage: `url(${bgstrip})`, display: "flex", alignItems: "center", justifyContent: "center", 
                    fontSize: "21px",
                    color: "white", fontWeight: "bold", borderRadius:"5px" }}
                // variant="h5" component="div" 
                // textAlign="center" sx={{fontWeight:"bold", color:"#0b894b"}}
                >
                    Without Subscription
                </Typography>
                <Box p={1} />
                <Typography >
                    Accessible only to five indices:
                </Typography>
                <Typography color="text.secondary">
                    {bull} Nifty 50
                </Typography>
                <Typography color="text.secondary">
                    {bull} Nifty Midcap 50
                </Typography>
                <Typography color="text.secondary">
                    {bull} Nifty SMLCAP 50
                </Typography>
                <Typography color="text.secondary">
                    {bull} Nifty LARGEMIDCAP 250
                </Typography>
                <Typography color="text.secondary">
                    {bull} Nifty Nifty Bank
                </Typography>
            </CardContent>
            <CardActions>
                {/* <Button size="small">Learn More</Button> */}
            </CardActions>
        </Card>
    );
}