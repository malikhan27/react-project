import * as React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { supabase } from '../utils/config';


const steps = ['Personal Details', 'Inquiry', 'Loan Request'];

export default function NewLoan() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      profession: '',
      income: '',
      loanAmount: '',
      purpose: '',
      duration: '',
      guarantee: '',
    },
  });

  const totalSteps = () => steps.length;
  const isLastStep = () => activeStep === totalSteps() - 1;

  const getFieldsForStep = (step) => {
    if (step === 0) return ['name', 'email', 'phone'];
    if (step === 1) return ['profession', 'income'];
    if (step === 2) return ['loanAmount', 'purpose', 'duration', 'guarantee'];
    return [];
  };

  const handleNext = async () => {
    const fields = getFieldsForStep(activeStep);
    const valid = await trigger(fields);
    if (!valid) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleComplete = async () => {
    const fields = getFieldsForStep(activeStep);
    const valid = await trigger(fields);
    if (!valid) return;

    setCompleted((prev) => ({ ...prev, [activeStep]: true }));

    if (isLastStep()) {
      setShowConfirmation(true); // 👈 Show confirmation instead of moving forward
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setShowConfirmation(false);
  };

  const handleConfirmSubmit = () => {
    const finalData = getValues();
    console.log('Final submitted data:', finalData);
    async function saveDatabase() {

      try {
        const { data , error } = await supabase
        .from('loanRequest')
        .insert({ name:finalData.name,email:finalData.email,profession:finalData.profession,income:finalData.income,loanAmount:finalData.loanAmount,duration:finalData.duration, });
        if (error) throw error;
        if (data) {
          console.log('Data inserted successfully:', data);
      
          
        }

      } catch (error) {
        
      } 
  
   
    }

    
    handleReset();
    saveDatabase();
  };

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 4 }, pt: 4 }}>
      <Stepper nonLinear activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Step {activeStep + 1}: {steps[activeStep]}
      </Typography>

      <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activeStep === 0 && (
          <>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField {...field} label="Name" fullWidth error={!!errors.name} helperText={errors.name?.message} />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email format',
                },
              }}
              render={({ field }) => (
                <TextField {...field} label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: 'Phone must be 11 digits',
                },
              }}
              render={({ field }) => (
                <TextField {...field} label="Phone" fullWidth error={!!errors.phone} helperText={errors.phone?.message} />
              )}
            />
          </>
        )}

        {activeStep === 1 && (
          <>
            <Controller
              name="profession"
              control={control}
              rules={{ required: 'Profession is required' }}
              render={({ field }) => (
                <TextField {...field} label="Profession" fullWidth error={!!errors.profession} helperText={errors.profession?.message} />
              )}
            />
            <Controller
              name="income"
              control={control}
              rules={{
                required: 'Income is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Must be a number',
                },
              }}
              render={({ field }) => (
                <TextField {...field} label="Income" fullWidth error={!!errors.income} helperText={errors.income?.message} />
              )}
            />
          </>
        )}

        {activeStep === 2 && (
          <>
            <Controller
              name="loanAmount"
              control={control}
              rules={{
                required: 'Loan amount is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Must be numeric',
                },
              }}
              render={({ field }) => (
                <TextField {...field} label="Loan Amount" fullWidth error={!!errors.loanAmount} helperText={errors.loanAmount?.message} />
              )}
            />
            <Controller
              name="purpose"
              control={control}
              rules={{ required: 'Purpose is required' }}
              render={({ field }) => (
                <TextField {...field} label="Purpose" fullWidth error={!!errors.purpose} helperText={errors.purpose?.message} />
              )}
            />
            <Controller
              name="duration"
              control={control}
              rules={{
                required: 'Duration is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Duration must be in months',
                },
              }}
              render={({ field }) => (
                <TextField {...field} label="Duration (months)" fullWidth error={!!errors.duration} helperText={errors.duration?.message} />
              )}
            />
            <Controller
              name="guarantee"
              control={control}
              rules={{ required: 'Guarantee is required' }}
              render={({ field }) => (
                <TextField {...field} label="Guarantee" fullWidth error={!!errors.guarantee} helperText={errors.guarantee?.message} />
              )}
            />
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mt: 3 }}>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {!isLastStep() && (
          <Button variant="outlined" onClick={handleNext}>
            Next
          </Button>
        )}

        <Button variant="contained" onClick={handleComplete} color="primary">
          {isLastStep() ? 'Finish' : 'Complete Step'}
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Your Details</DialogTitle>
        <DialogContent dividers>
  <Box>
    {Object.entries(getValues()).map(([key, value]) => (
      <Box key={key} sx={{ mb: 1 }}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
      </Box>
    ))}
  </Box>
</DialogContent>

        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)} color="secondary">
            Edit
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary" variant="contained">
            Confirm & Submit
          </Button>;
        </DialogActions>
      </Dialog>
    </Box>
  );
}
