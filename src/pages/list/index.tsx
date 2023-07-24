import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import BeerForm from '../beer-form';
import Box from '@mui/material/Box';
import BeerCard from '../../components/card';
import { Button, CircularProgress, Grid, Modal, Stack } from '@mui/material';
import { fetchBeer, IBEER, IPAGINATION } from '../../services/BeerService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BeerList = forwardRef<any, { activeTab: number }>(({ activeTab }, ref) => {
  const [beers, setBeers] = useState<IBEER[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<IPAGINATION>({
    limit: 10,
    page: 1,
  });
  const [openForm, setOpenForm] = useState(false);

  const getBeer = useCallback(() => {
    return fetchBeer(pagination);
  }, [beers]);

  useEffect(() => {
    if (activeTab === 0) {
      // for loading feel
      setIsLoading(true);
      setTimeout(() => {
        getBeer()
          .then((data) => {
            setBeers([...beers, ...data.data]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 500);
    }
  }, [activeTab, pagination]);

  const scrollRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    scrollRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [beers]);

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal: () => setOpenForm(true),
        nullifyData: () => setBeers([]),
      };
    },
    [],
  );

  const handleClose = () => {
    setOpenForm(false);
  };
  const onsubmit = (val: IBEER) => {
    setBeers([...beers, val]);
    setOpenForm(false);
  };
  return (
    <Stack
      className={'mv-8'}
      justifyContent={'center'}
      alignItems={'center'}
      style={{ position: 'relative' }}
    >
      {isLoading && <CircularProgress className={'spinner'} color='inherit' />}
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 1, md: 2 }}
        className={isLoading ? 'op-blur' : ''}
      >
        {beers?.map((beer, index) => {
          return (
            <Grid key={`${beer.id}${index}`} item xs={12} sm={12} md={6} lg={6}>
              <BeerCard {...beer} />
            </Grid>
          );
        })}
      </Grid>
      <div ref={scrollRef}></div>
      {activeTab === 0 && (
        <Button
          disabled={isLoading}
          onClick={() => {
            setPagination({
              ...pagination,
              page: pagination.page + 1,
            });
          }}
        >
          Load More.....
        </Button>
      )}
      <Modal open={openForm} onClose={handleClose}>
        <Box sx={modalStyle}>
          <BeerForm
            onSubmit={onsubmit}
            onCancel={() => {
              setOpenForm(false);
            }}
          />
        </Box>
      </Modal>
    </Stack>
  );
});
BeerList.displayName = 'BeerList';
export default BeerList;
