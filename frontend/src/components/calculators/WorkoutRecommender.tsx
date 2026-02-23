import React, { FormEvent } from 'react';
import { Button, CircularProgress, Paper, Typography, Box, Grid, TextField, MenuItem } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ReactMarkdown from 'react-markdown';
import { useHealthForm } from '../../hooks/useHealthForm';

const WorkoutRecommender: React.FC = () => {
  const { workoutState, form, handleChange, validateCommonForm, getWorkoutRecommendation, copyWorkoutRecommendation } = useHealthForm();

  const isValid = validateCommonForm();

  return (
    <Box component="form" onSubmit={getWorkoutRecommendation}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        The workout recommender analyses your fitness level, occupation activity, sleep patterns, and goals to generate a personalised exercise plan.
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            required
            size="small"
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
            size="small"
            label="Occupation"
            name="occupation"
            value={form.occupation ?? ''}
            onChange={handleChange}
            error={!form.occupation?.trim()}
            helperText={!form.occupation?.trim() ? 'Required field' : ''}
            placeholder="e.g. Office Worker, Manual Labour, Student"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            required
            size="small"
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
            size="small"
            label="Your Fitness Goals"
            name="goals"
            value={form.goals ?? ''}
            onChange={handleChange}
            placeholder="e.g. Lose 10kg, build muscle, improve endurance, train for marathon"
            multiline
            rows={2}
            helperText="Be specific about what you want to achieve"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={getWorkoutRecommendation}
        disabled={workoutState.loading || !isValid}
        fullWidth
        size="large"
        sx={{ mb: 3 }}
      >
        {workoutState.loading ? <CircularProgress size={24} /> : 'Get Workout Recommendation'}
      </Button>
      {workoutState.result && (
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your personalised workout plan
          </Typography>
          <Box sx={{ maxHeight: 400, overflow: 'auto', p: 3, bgcolor: 'grey.50', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
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
              {workoutState.result.workout_recommendation}
            </ReactMarkdown>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={copyWorkoutRecommendation}
            endIcon={<ContentCopy />}
            sx={{ textTransform: 'none', display: 'block', mx: 'auto' }}
          >
            Copy to Clipboard
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default WorkoutRecommender;
