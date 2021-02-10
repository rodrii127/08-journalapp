import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Sidebar } from '../journal/Sidebar'

export default props => {
    return (
      // Pass on our props
      <Menu {...props}>
        <Sidebar />
      </Menu>
    );
  };
  