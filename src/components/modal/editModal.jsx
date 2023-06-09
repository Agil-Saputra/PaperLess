import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem , Icon, Stack} from "@mui/material"
import { useForm } from 'react-hook-form';

import { db } from "../../config/client";
import { doc, updateDoc } from "firebase/firestore";
import { categories } from "../../api/categories";

export default function modal({close, open, id, title, details, category}) {

      // updating user
      async function updateUser(id, data) {
        const userDoc = doc(db, "Notes", id)
        await updateDoc(userDoc, {
          title : data.NewTitle,
          details : data.NewDetails,
          category : data.NewCategory,
        })  
      }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {sm: 500, xs: '90%'},
    bgcolor: 'background.paper',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: 1,
    borderRadius: '5px',
    p: 4,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  return (
    <Modal
    open={open}
    onClose={close}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    
  >
    <Box component='form' sx={style} onSubmit={handleSubmit((data) => {
      updateUser(id, data);
      reset()
      close();
     }) }>

      <TextField
        id="outlined-basic"
        label="Write Your New Title"
        variant="outlined"
        defaultValue={title}
        fullWidth
        sx={{ mb: 3 }}
        {...register('NewTitle', { required: true })}
        error={errors.NewTitle}
      />

      <TextField
        id="outlined-basic"
        label="Write Your New Note"
        variant="outlined"
        fullWidth
       defaultValue={details}
        multiline
        rows={5}
        sx={{ mb: 3 }}
        {...register('NewDetails', { required: true })}
        error={errors.NewDetails}
      />


<FormControl fullWidth sx={{mb: 3}}>
          <InputLabel id="demo-simple-select-label">Select Your New Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={category}
            label="Select Your New Category"
            {...register('NewCategory', { required: true })}
            error={errors.NewCategory}
            sx={{
              '& .css-qiwgdb.css-qiwgdb.css-qiwgdb': {
                display: 'flex',
                gap : 2,
              }
            }}
          >
          {
            categories.map((item, i) => (
            <MenuItem value={item.title} key={i} sx={{
              display: 'flex',
              alignItems: 'center',
              gap : 2
            }}>
            <Icon>{item.icon}</Icon>
            <Typography>{item.title}</Typography>
            </MenuItem>))
          }
          </Select>
        </FormControl>

      <Stack spacing={2} direction='row' marginY={1}>
      <Button type="submit" variant="contained">Submit Changes</Button>
      <Button onClick={() => {close()}} color="error" variant="contained">Cancel</Button>
      </Stack>
    </Box>
  </Modal>
  )
}
