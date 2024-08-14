import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';

const ReadMore = ({ content, maxCharacterCount = 300 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const truncatedContent = content.length > maxCharacterCount ? content.slice(0, maxCharacterCount) + "..." : content;
    const displayContent = isExpanded ? content : truncatedContent;

    return (
        <Box>
            <Typography
                sx={{ fontSize: { xs: 14, sm: 16 }, textAlign: "justify", textIndent: "30px" }}
                dangerouslySetInnerHTML={{ __html: displayContent }}
            />
            {content.length > maxCharacterCount && (
                <Button onClick={toggleReadMore} sx={{ textTransform: 'none', p: 0, mt: 1 }}>
                    {isExpanded ? "Read Less" : "Read More"}
                </Button>
            )}
        </Box>
    );
};

export default ReadMore;