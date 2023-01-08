import React from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({openToast, handleCloseToast, msg}) => {
  return (
    <Stack spacing={2} sx={{ width: '50%', margin: "auto" }}>
      <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'center' }} TransitionComponent="SlideTransition" open={openToast} autoHideDuration={2000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default Toast