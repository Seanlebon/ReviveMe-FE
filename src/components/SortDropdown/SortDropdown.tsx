import React from 'react';
import { Dropdown } from 'react-bootstrap';
import sortTypes from '../../constants/SortTypes';

import './SortDropdown.css';

interface SortDropdownProps {
  sort: string | null;
  onSortChange: (sort: string | null) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sort,
  onSortChange = (_) => {},
}) => {
  return (
    <div className='sortDropdownContainer'>
      <p className='sortText'>Sort by: </p>
      <Dropdown
        data-bs-theme='dark'
        onSelect={(eventKey: string | null, event: Object) => {
          onSortChange(eventKey);
        }}
      >
        <Dropdown.Toggle
          id='dropdown-button-dark-sort-menu'
          variant='secondary'
          className='dropdownToggle'
          style={{ backgroundColor: 'transparent', color: 'black' }}
        >
          {sort}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Object.values(sortTypes).map((sortType) => (
            <Dropdown.Item
              key={sortType}
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
    </div>
  );
};

export default SortDropdown;
