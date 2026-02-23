import React from 'react';
import { Button, Card, CardContent, CardActions, Typography, Box } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ReactMarkdown from 'react-markdown';

interface WorkoutRecommendation {
  workout_recommendation: string;
}

interface RecommendationCardProps {
  recommendation: WorkoutRecommendation;
  onCopy: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onCopy
}) => {
  return (
    <Card sx={{ mt: 5, boxShadow: 6, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 300, color: 'text.primary' }}>
          Your Personalised Workout Plan
        </Typography>
        <Box sx={{ maxHeight: 400, overflow: 'auto', p: 3, bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <ReactMarkdown
            components={{
              h1: ({ children, ...props }) => <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 600 }} {...props as any}>{children}</Typography>,
              h2: ({ children, ...props }) => <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 500 }} {...props as any}>{children}</Typography>,
              h3: ({ children, ...props }) => <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 500 }} {...props as any}>{children}</Typography>,
              p: ({ children, ...props }) => <Typography component="p" sx={{ mb: 2, lineHeight: 1.6 }} {...props as any}>{children}</Typography>,
              strong: ({ children, ...props }) => <strong style={{ fontWeight: 'bold', color: '#1a1a1a' }} {...props as any}>{children}</strong>,
              em: ({ children, ...props }) => <em style={{ fontStyle: 'italic', color: '#1a1a1a' }} {...props as any}>{children}</em>,
              code: ({ children, ...props }) => <code style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '0.2em 0.4em', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em' }} {...props as any}>{children}</code>,
              ul: ({ children, ...props }) => <Box component="ul" sx={{ mb: 2, pl: 2, listStyleType: 'disc' }} {...props as any}>{children}</Box>,
              ol: ({ children, ...props }) => <Box component="ol" sx={{ mb: 2, pl: 2, listStyleType: 'decimal' }} {...props as any}>{children}</Box>,
              li: ({ children, ...props }) => <Typography component="li" sx={{ mb: 1, lineHeight: 1.6 }} {...props as any}>{children}</Typography>,
              pre: ({ children, ...props }) => <Box component="pre" sx={{ backgroundColor: 'rgba(0,0,0,0.05)', p: 2, borderRadius: 2, overflowX: 'auto', mb: 2 }} {...props as any}>{children}</Box>
            }}
          >
            {recommendation.workout_recommendation}
          </ReactMarkdown>
        </Box>
        <CardActions sx={{ justifyContent: 'center', pt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={onCopy}
            endIcon={<ContentCopy />}
            sx={{ textTransform: 'none' }}
          >
            Copy to Clipboard
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;