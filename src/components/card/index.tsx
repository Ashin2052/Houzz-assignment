import React, { FC } from 'react';

import { Card, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { IBEER } from '../../services/BeerService';

const BeerCard: FC<IBEER> = (beer: IBEER) => {
  const ingredient = beer.ingredients ? Object.keys(beer?.ingredients).toString() : '';

  return (
    <Card variant='outlined' className={'pd-8 card-shadow'}>
      <Grid
        container
        height={150}
        overflow={'auto'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item xs={3}>
          <Tooltip title={'Ingredients:' + ingredient} placement='bottom-start'>
            <img height={100} width={50} src={beer.image_url} alt={beer.description} />
          </Tooltip>
        </Grid>
        <Grid item xs={9}>
          <Stack spacing={2}>
            <Typography variant={'h6'}>{beer.name}</Typography>
            <div className={'tagline'}>{beer.tagline}</div>
            <div className={'description'}>{beer.description}</div>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BeerCard;
