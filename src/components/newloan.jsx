import React, { useContext, useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../utils/config';
import { CompleteDataContext } from '../context/completeData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const steps = ['Personal Details', 'Inquiry', 'Loan Request'];

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{11}$/, 'Phone must be 11 digits').required('Phone is required'),
  profession: yup.string().required('Profession is required'),
  income: yup.number().typeError('Income must be a number').required('Income is required'),
  loanAmount: yup
    .number()
    .typeError('Loan amount must be numeric')
    .max(50000, 'Maximum allowed is 50,000')
    .required('Loan amount is required'),
  purpose: yup.string().required('Purpose is required'),
  duration: yup.number().typeError('Duration must be a number').required('Duration is required'),
  guarantee: yup.string().required('Guarantee is required'),
});

export default function NewLoan() {
  const { fetchCompleteData } = useContext(CompleteDataContext);
  const [activeStep, setActiveStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

  const getStepFields = (step) => {
    const stepMap = [
      ['name', 'email', 'phone'],
      ['profession', 'income'],
      ['loanAmount', 'purpose', 'duration', 'guarantee'],
    ];
    return stepMap[step] || [];
  };

  const onNext = async () => {
    const fields = getStepFields(activeStep);
    const valid = await trigger(fields);
    if (!valid) return;

    if (activeStep === steps.length - 1) {
      setShowConfirmation(true);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const onBack = () => setActiveStep((prev) => prev - 1);

  const onReset = () => {
    setActiveStep(0);
    setShowConfirmation(false);
  };

  const onSubmit = async () => {
    const data = getValues();
    const { error } = await supabase.from('loanRequest').insert({ ...data, status: 'pending' });

    if (error) {
      toast.error('Failed to submit loan request.');
    } else {
      toast.success('Loan request submitted!');
      fetchCompleteData();
      onReset();
    }
  };

  const renderField = (name, label, type = 'text') => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          type={type}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, pt: 4 }}>
      <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Step {activeStep + 1}: {steps[activeStep]}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {activeStep === 0 && (
          <>
            {renderField('name', 'Name')}
            {renderField('email', 'Email')}
            {renderField('phone', 'Phone')}
          </>
        )}
        {activeStep === 1 && (
          <>
            {renderField('profession', 'Profession')}
            {renderField('income', 'Income')}
          </>
        )}
        {activeStep === 2 && (
          <>
            {renderField('loanAmount', 'Loan Amount')}
            {renderField('purpose', 'Purpose')}
            {renderField('duration', 'Duration (months)')}
            {renderField('guarantee', 'Guarantee')}
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mt: 3 }}>
        <Button color="inherit" disabled={activeStep === 0} onClick={onBack}>
          Back
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" onClick={onNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>

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
          <Button onClick={onSubmit} variant="contained" color="primary">
            Confirm & Submit
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
