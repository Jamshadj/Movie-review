import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import { TextareaAutosize } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { addReview } from '../services';
import { useParams } from 'react-router-dom';

function ReviewDialog({ open, handleClose }) {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const { id } = useParams(); 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addReview(id, { starCount :rating, comment });
      setSuccessMessage('Review submitted successfully!');
      setSnackbarOpen(true); // Open Snackbar
      handleClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      // You can set an error message here if needed
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Leave a Review</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >
          <DialogContentText>
            We appreciate your feedback! Please rate your experience and leave a comment.
          </DialogContentText>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            sx={{ mb: 2 }} // Margin bottom for spacing
          />
          <TextareaAutosize
            id="comment"
            name="comment"
            minRows={3}
            placeholder="Enter comment"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              resize: 'none'
            }}
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Duration before it auto-hides
        onClose={handleSnackbarClose}
        message={successMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
}

ReviewDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ReviewDialog;
