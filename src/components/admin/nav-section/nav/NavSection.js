import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Collapse, List, Stack } from '@mui/material';
//
import NavItem from './NavItem';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  sx: PropTypes.object,
  navConfig: PropTypes.array.isRequired,
};

export default function NavSection({ navConfig, sx }) {

  return (
    <Stack sx={sx}>
      {navConfig.map((item, index) => {
        return (
          <List key={index} disablePadding sx={{ px: 2 }}>             
            <NavList item={item} depth={1} />
          </List>
        );
      })}
    </Stack>
  );
}

// ----------------------------------------------------------------------

NavList.propTypes = {
  item: PropTypes.object,
  depth: PropTypes.number,
};

function NavList({ item, depth }) {
  const { children } = item;

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavItem
        item={item}
        depth={depth}
        open={open}
        onClick={handleToggle}
      />

      {children && (
        <Collapse in={open} unmountOnExit>
          <NavSubList children={children} depth={depth} />
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

NavSubList.propTypes = {
  children: PropTypes.array,
  depth: PropTypes.number,
};

function NavSubList({ children, depth }) {
  return (
    <>
      {children.map((item, index) => (
        <NavList key={index} item={item} depth={depth + 1} />
      ))}
    </>
  );
}
