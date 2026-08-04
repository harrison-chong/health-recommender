import React, { FormEvent } from 'react';
import { Button, CircularProgress, Typography, Box, Grid, TextField, MenuItem, useTheme } from '@mui/material';
import ResultCard from '../common/ResultCard';
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
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#8A857C' : '#9A9388', lineHeight: 1.6 }}>
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
        {dietState.loading ? <CircularProgress size={24} sx={{ color: '#FAFAF7' }} /> : 'Get Diet Recommendation'}
      </Button>
      {dietState.result && (
        <ResultCard label="Your nutrition plan">
          <Typography sx={{ mb: 3, fontWeight: 600, color: '#FAFAF7', fontSize: '1.125rem' }}>
            Personalised Nutrition Plan
          </Typography>
          <Box
            className="num"
            sx={{
              maxHeight: 420,
              overflow: 'auto',
              p: 3,
              borderRadius: '2px',
              backgroundColor: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.06)',
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.15)' },
            }}
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 700, color: '#FAFAF7' }}>{children}</Typography>,
                h2: ({ children }) => <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#FAFAF7' }}>{children}</Typography>,
                h3: ({ children }) => <Typography variant="h6" component="h3" sx={{ mb: 1.5, mt: 2, fontWeight: 600, color: isDark ? '#FB923C' : '#F97316' }}>{children}</Typography>,
                p: ({ children }) => <Typography component="p" sx={{ mb: 1.5, lineHeight: 1.7, color: '#D4D2CC' }}>{children}</Typography>,
                strong: ({ children }) => <strong style={{ fontWeight: 700, color: '#FAFAF7' }}>{children}</strong>,
                em: ({ children }) => <em style={{ fontStyle: 'italic', color: '#8A857C' }}>{children}</em>,
                code: ({ children }) => (
                  <code style={{ backgroundColor: 'rgba(249,115,22,0.15)', padding: '0.15em 0.4em', borderRadius: '2px', fontFamily: '"Space Mono", monospace', fontSize: '0.85em', color: isDark ? '#FB923C' : '#F97316' }}>
                    {children}
                  </code>
                ),
                ul: ({ children }) => <Box component="ul" sx={{ mb: 2, pl: 3, '& li': { mb: 0.5 } }}>{children}</Box>,
                ol: ({ children }) => <Box component="ol" sx={{ mb: 2, pl: 3, '& li': { mb: 0.5 } }}>{children}</Box>,
                li: ({ children }) => <Typography component="li" sx={{ lineHeight: 1.6, color: '#D4D2CC' }}>{children}</Typography>,
                pre: ({ children }) => (
                  <Box component="pre" sx={{ backgroundColor: 'rgba(0,0,0,0.3)', p: 2, borderRadius: '2px', overflow: 'auto', mb: 2, border: '1px solid rgba(255,255,255,0.06)' }}>
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
                borderRadius: '2px',
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#FAFAF7',
                '&:hover': { borderColor: '#FAFAF7', backgroundColor: 'rgba(255,255,255,0.05)' },
                px: 3,
                py: 1,
              }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        </ResultCard>
      )}
    </Box>
  );
};

export default DietRecommender;