import { Button, Modal, Stack, Tab, Tabs } from '@mui/material';
import React, { SyntheticEvent, useRef, useState } from 'react';

import BeerList from '../list';
import Box from '@mui/material/Box';

const Home = () => {
  //could have used custom hooks for tab.
  const [activetab, setActiveTab] = useState(0);
  //need to use this because add beer bottom is in parent component so to trigger open form on list component.
  const listRef = useRef() as React.MutableRefObject<any>;

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack
          width={'100%'}
          direction='row'
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Tabs
            value={activetab}
            onChange={(event: SyntheticEvent, newValue: number) => {
              setActiveTab(newValue);
              if (listRef.current) {
                listRef.current?.nullifyData();
              }
            }}
          >
            <Tab label='List' />
            <Tab label='My Beer' />
          </Tabs>
          <Button
            onClick={() => {
              if (listRef.current) {
                listRef.current?.openModal();
              }
            }}
          >
            Add new Beer{' '}
          </Button>
        </Stack>

        <BeerList ref={listRef} activeTab={activetab} />
      </Box>
    </div>
  );
};

export default Home;
