import React, { FormEvent } from 'react';
import { Button, CircularProgress, Paper, Typography, Box, Grid, TextField, MenuItem, useTheme } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ReactMarkdown from 'react-markdown';

interface DietRecommenderProps {
  dietState: { result: { diet_recommendation: string } | null; loading: boolean; error: string | null };
  form: {
    fitness_level: string;
    occupation: string;
    average_sleep_hours: number | null;
    goals: string | null;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  validateCommonForm: () => boolean;
  getDietRecommendation: (e: FormEvent) => Promise<void>;
  copyDietRecommendation: () => Promise<void>;
}

const DietRecommender: React.FC<DietRecommenderProps> = ({ dietState, form, handleChange, validateCommonForm, getDietRecommendation, copyDietRecommendation }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isValid = validateCommonForm();

  return (
    <Box component="form" onSubmit={getDietRecommendation}>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#A1A1AA' : '#71717A', lineHeight: 1.6 }}>
        The diet recommender analyses your fitness level, occupation, sleep patterns, and goals to generate a personalised nutrition plan.
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            required
            size="medium"
            label="Fitness Level"
            name="fitness_level"
            select
            value={form.fitness_level}
            onChange={handleChange}
          >
            <MenuItem value="Beginner">Beginner (new to exercise)</MenuItem>
            <MenuItem value="Intermediate">Intermediate (1-3 years training)</MenuItem>
            <MenuItem value="Advanced">Advanced (3+ years training)</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            required
            size="medium"
            label="Occupation"
            name="occupation"
            value={form.occupation ?? ''}
            onChange={handleChange}
            error={!form.occupation?.trim()}
            helperText={!form.occupation?.trim() ? 'Required field' : 'e.g. Office Worker, Manual Labour'}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            required
            size="medium"
            label="Average Sleep per Night"
            name="average_sleep_hours"
            type="number"
            value={form.average_sleep_hours ?? ''}
            onChange={handleChange}
            error={form.average_sleep_hours == null || form.average_sleep_hours <= 0 || form.average_sleep_hours > 24}
            helperText="Hours (0-24)"
            inputProps={{ min: 0, max: 24, step: 0.5 }}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            size="medium"
            label="Your Health & Nutrition Goals"
            name="goals"
            value={form.goals ?? ''}
            onChange={handleChange}
            placeholder="e.g. Lose weight, improve energy, manage stress"
            multiline
            rows={2}
            helperText="Be specific about what you want to achieve"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={getDietRecommendation}
        disabled={dietState.loading || !isValid}
        fullWidth
        size="large"
        sx={{
          mb: 3.5,
          py: 1.5,
          fontSize: '0.9375rem',
          fontWeight: 500,
        }}
      >
        {dietState.loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Get Diet Recommendation'}
      </Button>
      {dietState.result && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '16px',
            backgroundColor: isDark ? 'rgba(99,102,241,0.08)' : 'rgba(79,70,229,0.04)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(79,70,229,0.1)',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: isDark ? '#FAFAFA' : '#09090B' }}>
            Your Personalised Diet Plan
          </Typography>
          <Box
            sx={{
              maxHeight: 420,
              overflow: 'auto',
              p: 3,
              borderRadius: '12px',
              backgroundColor: isDark ? '#09090B' : '#FAFAFA',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            }}
          >
            <ReactMarkdown
              components={{
                h1: ({ children, ...props }) => (
                  <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 600, color: isDark ? '#FAFAFA' : '#09090B' }} {...props as any}>
                    {children}
                  </Typography>
                ),
                h2: ({ children, ...props }) => (
                  <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: isDark ? '#F4F4F5' : '#18181B' }} {...props as any}>
                    {children}
                  </Typography>
                ),
                h3: ({ children, ...props }) => (
                  <Typography variant="h6" component="h3" sx={{ mb: 1.5, fontWeight: 600, color: isDark ? '#E4E4E7' : '#27272A' }} {...props as any}>
                    {children}
                  </Typography>
                ),
                p: ({ children, ...props }) => (
                  <Typography component="p" sx={{ mb: 2, lineHeight: 1.7, color: isDark ? '#D4D4D8' : '#52525B' }} {...props as any}>
                    {children}
                  </Typography>
                ),
                strong: ({ children, ...props }) => (
                  <strong style={{ fontWeight: 600, color: isDark ? '#FAFAFA' : '#18181B' }} {...props as any}>
                    {children}
                  </strong>
                ),
                em: ({ children, ...props }) => (
                  <em style={{ fontStyle: 'italic', color: isDark ? '#A1A1AA' : '#71717A' }} {...props as any}>
                    {children}
                  </em>
                ),
                code: ({ children, ...props }) => (
                  <code
                    style={{
                      backgroundColor: isDark ? 'rgba(34,211,238,0.15)' : 'rgba(14,165,233,0.1)',
                      padding: '0.2em 0.4em',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '0.875em',
                      color: isDark ? '#22D3EE' : '#0891B2',
                    }}
                    {...props as any}
                  >
                    {children}
                  </code>
                ),
                ul: ({ children, ...props }) => (
                  <Box component="ul" sx={{ mb: 2, pl: 3, '& li': { mb: 0.75 } }} {...props as any}>
                    {children}
                  </Box>
                ),
                ol: ({ children, ...props }) => (
                  <Box component="ol" sx={{ mb: 2, pl: 3, '& li': { mb: 0.75 } }} {...props as any}>
                    {children}
                  </Box>
                ),
                li: ({ children, ...props }) => (
                  <Typography component="li" sx={{ lineHeight: 1.6, color: isDark ? '#D4D4D8' : '#52525B' }} {...props as any}>
                    {children}
                  </Typography>
                ),
                pre: ({ children, ...props }) => (
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: isDark ? '#18181B' : '#F4F4F5',
                      p: 2,
                      borderRadius: '8px',
                      overflow: 'auto',
                      mb: 2,
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    }}
                    {...props as any}
                  >
                    {children}
                  </Box>
                ),
              }}
            >
              {dietState.result.diet_recommendation}
            </ReactMarkdown>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              size="medium"
              onClick={copyDietRecommendation}
              startIcon={<ContentCopy />}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: '10px',
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                color: isDark ? '#A1A1AA' : '#71717A',
                '&:hover': {
                  borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                },
                px: 3,
                py: 1,
              }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DietRecommender;