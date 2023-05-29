import MoreVertIcon from '@mui/icons-material/MoreVert';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';




const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));



export function StyledTreeItem(props) {
  const { bgColor, color, labelIcon: LabelIcon, labelInfo, labelText,showMenu, type, ...other } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };


  const handleMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const renamemenu = (event) => {
    event.stopPropagation();
    if(type === 'notebook'){
       props.renamemenu(props.nodeId, type); 
    }else if(type === 'deck'){
        props.renamemenu(props.nodeId, type);
    }
    
  }

  const deleteMenu = (event) => {
    event.stopPropagation();
    if(type === 'notebook'){
        props.deleteMenu(props.nodeId, type); 
     }else if(type === 'deck'){
         props.deleteMenu(props.nodeId, type);
     }
  };


  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1, maxWidth:'100px', overflow:'hidden' }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
          {(showMenu) ? (
            <IconButton onClick={handleMenu}>
              <MoreVertIcon />
            </IconButton>
          ) : null}
          <Menu
            id={labelText}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': {labelText},
            }}
          >

            <MenuItem onClick={(event) => renamemenu(event)}>{(type === 'notebook') ? 'Renomear caderno' : 'Renomear Deck'}</MenuItem>
            <MenuItem onClick={(event) => deleteMenu(event)}>{(type === 'notebook') ? 'Deletar caderno' : 'Deletar Deck'}</MenuItem>
            
          </Menu>

        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

