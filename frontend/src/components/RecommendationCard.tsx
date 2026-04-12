import React from 'react';
import { Button, Card, CardContent, CardActions, Typography, Box, useTheme } from '@mui/material';
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
  onCopy,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 3,
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        border: '1px solid',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: isDark ? '#f8fafc' : '#0f172a',
          }}
        >
          Your Personalised Plan
        </Typography>

        <Box
          sx={{
            maxHeight: 400,
            overflow: 'auto',
            p: 3,
            borderRadius: 2,
            backgroundColor: isDark ? '#0f172a' : '#f8fafc',
            border: '1px solid',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children, ...props }) => (
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{ mb: 2, fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}
                  {...props as any}
                >
                  {children}
                </Typography>
              ),
              h2: ({ children, ...props }) => (
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mb: 2, fontWeight: 600, color: isDark ? '#f1f5f9' : '#1e293b' }}
                  {...props as any}
                >
                  {children}
                </Typography>
              ),
              h3: ({ children, ...props }) => (
                <Typography
                  variant="body1"
                  component="h3"
                  sx={{ mb: 1.5, fontWeight: 600, color: isDark ? '#e2e8f0' : '#334155' }}
                  {...props as any}
                >
                  {children}
                </Typography>
              ),
              p: ({ children, ...props }) => (
                <Typography
                  component="p"
                  sx={{ mb: 2, lineHeight: 1.7, color: isDark ? '#cbd5e1' : '#475569' }}
                  {...props as any}
                >
                  {children}
                </Typography>
              ),
              strong: ({ children, ...props }) => (
                <strong
                  style={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}
                  {...props as any}
                >
                  {children}
                </strong>
              ),
              em: ({ children, ...props }) => (
                <em
                  style={{
                    fontStyle: 'italic',
                    color: isDark ? '#94a3b8' : '#64748b',
                  }}
                  {...props as any}
                >
                  {children}
                </em>
              ),
              code: ({ children, ...props }) => (
                <code
                  style={{
                    backgroundColor: isDark ? '#334155' : '#f1f5f9',
                    padding: '0.2em 0.4em',
                    borderRadius: 4,
                    fontFamily: 'monospace',
                    fontSize: '0.875em',
                    color: isDark ? '#60a5fa' : '#2563eb',
                  }}
                  {...props as any}
                >
                  {children}
                </code>
              ),
              ul: ({ children, ...props }) => (
                <Box
                  component="ul"
                  sx={{ mb: 2, pl: 3, '& li': { mb: 0.75 } }}
                  {...props as any}
                >
                  {children}
                </Box>
              ),
              ol: ({ children, ...props }) => (
                <Box
                  component="ol"
                  sx={{ mb: 2, pl: 3, '& li': { mb: 0.75 } }}
                  {...props as any}
                >
                  {children}
                </Box>
              ),
              li: ({ children, ...props }) => (
                <Typography
                  component="li"
                  sx={{ lineHeight: 1.6, color: isDark ? '#cbd5e1' : '#475569' }}
                  {...props as any}
                >
                  {children}
                </Typography>
              ),
              pre: ({ children, ...props }) => (
                <Box
                  component="pre"
                  sx={{
                    backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
                    p: 2,
                    borderRadius: 2,
                    overflow: 'auto',
                    mb: 2,
                    border: '1px solid',
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                  }}
                  {...props as any}
                >
                  {children}
                </Box>
              ),
            }}
          >
            {recommendation.workout_recommendation}
          </ReactMarkdown>
        </Box>

        <CardActions sx={{ justifyContent: 'center', pt: 3 }}>
          <Button
            variant="outlined"
            size="medium"
            onClick={onCopy}
            endIcon={<ContentCopy />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              borderColor: isDark ? '#475569' : '#cbd5e1',
              color: isDark ? '#cbd5e1' : '#475569',
              cursor: 'pointer',
              '&:hover': {
                borderColor: isDark ? '#64748b' : '#94a3b8',
                backgroundColor: isDark ? '#334155' : '#f8fafc',
              },
            }}
          >
            Copy to Clipboard
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;