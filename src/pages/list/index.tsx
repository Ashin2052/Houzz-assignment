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
import { Button, Grid, Modal, Stack } from '@mui/material';
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
      setIsLoading(true);
      getBeer()
        .then((data) => {
          setBeers([...beers, ...data.data]);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const lastChildElement = ref.current?.lastElementChild;
          lastChildElement?.scrollIntoView({ behavior: 'smooth' });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [activeTab, pagination]);

  const scrollRef = useRef(null);

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
    <Stack className={'mv-8'}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 2 }}
        maxHeight={700}
        ref={scrollRef}
        overflow={'auto'}
      >
        {beers?.map((beer,index) => {
          return (
            <Grid key={`${beer.id}${index}`} item xs={12} sm={12} md={6} lg={6}>
              <BeerCard {...beer} />
            </Grid>
          );
        })}
      </Grid>
      {activeTab === 0 && (
        <Button
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
