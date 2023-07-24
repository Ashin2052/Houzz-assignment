import React from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { IBEER } from '../../services/BeerService';
import { Button, Stack, TextField, Typography } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string().nullable().min(5).required('Name is required'),
  description: yup.string().nullable().min(10).required('Description is required'),
  tagline: yup.string().nullable().min(5).required('Tagline is required'),
  image_url: yup.string().nullable().required('Image is required'),
});

export interface IBeerForm {
  onSubmit: (beer: IBEER) => void;
  onCancel: () => void;
}
const BeerForm = ({ onSubmit, onCancel }: IBeerForm) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      tagline: '',
      image_url: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values as IBEER);
    },
  });

  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Typography variant='h6' component='h2'>
        Add Beer
      </Typography>
      <div style={{ width: '100%' }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack rowGap={4}>
            <Stack direction={'column'} rowGap={2}>
              <img height={100} width={100} alt='' src={formik.values.image_url} />
              <input
                accept='image/png, image/gif, image/jpeg'
                type={'file'}
                onChange={(event) => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  formik.setFieldValue('image_url', URL.createObjectURL(event.target.files[0]));
                }}
              />
            </Stack>

            <TextField
              required
              fullWidth
              id='name'
              name='name'
              label='Beer name'
              variant={'outlined'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              required
              id='tagline'
              name='tagline'
              label='Genre'
              variant={'outlined'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tagline && Boolean(formik.errors.tagline)}
              helperText={formik.touched.tagline && formik.errors.tagline}
            />
            <TextField
              fullWidth
              required
              id='description'
              name='description'
              label='Description'
              variant={'outlined'}
              inputProps={{
                style: {
                  height: '100px',
                },
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <Stack justifyContent={'end'} direction={'row'} gap={2}>
              <Stack>
                <Button variant='outlined' type='reset' onClick={onCancel}>
                  Cancel
                </Button>
              </Stack>
              <Stack>
                <Button color='primary' variant='contained' type='submit'>
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </div>
    </Stack>
  );
};

export default BeerForm;
