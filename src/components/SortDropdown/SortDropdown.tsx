import React from 'react';
import { Dropdown } from 'react-bootstrap';
import sortTypes from '../../constants/SortTypes';

interface SortDropdownProps {
  sort: string | null;
  setSort: (sort: string | null) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sort, setSort }) => {
  return (
    <>
      <p style={{ margin: 0 }}>Sort by: </p>
      <Dropdown
        data-bs-theme='dark'
        onSelect={(eventKey: string | null, event: Object) => {
          setSort(eventKey);
        }}
      >
        <Dropdown.Toggle
          id='dropdown-button-dark-sort-menu'
          variant='secondary'
          style={{
            backgroundColor: 'transparent',
            color: 'black',
            border: 'none',
            width: '6em', // This is to make it so the 'sort by' text doesn't move when the sort changes
          }}
        >
          {sort}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Object.values(sortTypes).map((sortType) => (
            <Dropdown.Item
              key={sortType}
              href={`#/action-${sortType}`}
              active={sort === sortType}
              eventKey={sortType}
            >
              {
                sortType.charAt(0).toUpperCase() +
                  sortType.slice(1) /* Capitalize first letter */
              }
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SortDropdown;
