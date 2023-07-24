import React, { FC } from 'react';

import { Card, Grid, Stack } from '@mui/material';
import { IBEER } from '../../services/BeerService';

const BeerCard: FC<IBEER> = (beer: IBEER) => {
  return (
    <Card variant='outlined' className={'pd-8'}>
      <Grid
        container
        height={150}
        overflow={'auto'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item xs={3}>
          <img height={100} width={50} src={beer.image_url} alt={beer.description} />
        </Grid>
        <Grid item xs={9}>
          <Stack spacing={2}>
            <div>{beer.name}</div>
            <div>{beer.tag_line}</div>
            <div>{beer.description}</div>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BeerCard;
