import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import React from 'react';
import { IDataProps } from 'types';
import columnsDefinition from './columnsDefenition';

type Props = {
  data: IDataProps[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isFetched: boolean;
};

const WrapperStyle = {
  marginTop: '2%',
  marginBottom: '2%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Table = ({ data, isLoading, isSuccess, isFetched }: Props) => {
  const [pageSize, setPageSize] = React.useState<number>(10);

  if (!isLoading && isSuccess && data) {
    return (
      <div style={WrapperStyle}>
        <div style={{ width: '80%' }}>
          <DataGrid
            rows={data}
            columns={columnsDefinition}
            autoHeight
            showCellRightBorder
            showColumnRightBorder
            disableExtendRowFullWidth
            rowsPerPageOptions={[5, 10, 20]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }

  if (isFetched && !data) {
    return (
      <div style={WrapperStyle}>
        <Typography
          variant="h5"
          style={{
            position: 'absolute',
            textAlign: 'center',
            color: '#696969',
            top: '50%',
          }}
        >
          No data for the selected parameters (date and period)
        </Typography>
      </div>
    );
  }

  return (
    <div style={WrapperStyle}>
      <div style={{ width: '80%', minHeight: 645, position: 'relative' }}>
        <SkeletonLoader
          style={{ width: '100%', minHeight: 645, position: 'absolute' }}
        />
      </div>
    </div>
  );
};

export default Table;