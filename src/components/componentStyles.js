import { styled as styles } from "@mui/system";
import * as React from 'react';
import { Chip, ListItemButton, ListItemText, ListItem, SpeedDial, Dialog, CardContent, Box, Typography, IconButton, MenuItem, Menu } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { Delete, HeightTwoTone } from '@mui/icons-material'
import DescriptionIcon from '@mui/icons-material/Description'
import { styled } from '@mui/material/styles';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import PropTypes from 'prop-types';
import Label from '@mui/icons-material/Label';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const EditorContainer = styles('div')({
  width: "100%",
  paddingLeft: "1%",
  paddingRight: "1%",
  marginTop: "1%",
});

export const EditorNavBar = styles('div')({
  display: "inline-block",
  color: "white",
  borderTopRightRadius: "0.5em",
  flexDirection: "column"
});

export const StudyComponentDiv = styles('div')({
  marginTop: '2%',
  marginLeft: '5%',
});

export const ButtonContainer = styles('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '5px',
})


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
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    showMenu,
    ...other
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const renameMenu = (event) => {
    props.renameMenu(props.nodeId);
  }

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
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

            <MenuItem onClick={(event) => renameMenu(event)}>primeiro item</MenuItem>
            <MenuItem>segundo item</MenuItem>
            
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


export const SrsReview = styles(Box, {})({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 400,
  background: 'white',
  justifyContent: 'center',
  WebkitBorderBottomRightRadius: '1em',
  WebkitBorderBottomLeftRadius: '1em',
  WebkitBorderTopRightRadius: '1em',
  WebkitBorderTopLeftRadius: '1em',
});

export const StyledCardContent = styles(CardContent, {})({
  paddingTop: '30px',
  overflowY: 'auto',
  height: 'calc(100%-48px)',
  maxHeight: '300px',
});

export const cardList = styles('li')({

});
export const TitleInput = styles('input')({
  width: "100%",
  padding: '20px 30px 30px',
  fontSize: "24px",
  color: "black",
  textAlign: 'left',
  border: 'solid',
  borderWidth: '0.05em',
  WebkitBorderBottomRightRadius: '0.5em',
  WebkitBorderBottomLeftRadius: '0.5em',
  WebkitBorderTopRightRadius: '0.5em',
  WebkitBorderTopLeftRadius: '0.5em',
});

export const SidebarContainer = styles('div')({
  position: 'relative',
  width: "100%",
  marginTop: "5%",
  paddingLeft: "5%",
  backgroundColor: "#Ececec",
  maxWidth: '100%',
  borderTopRightRadius: '1em',
  borderBottomRightRadius: '1em'
});

export const UserIcon = styles(Chip, {})({
  width: "100%",
  marginBottom: "5px"
});

export const NewNoteInput = styles('input')({
  position: "sticky",
  width: "99%",
  margin: "0px",
  height: "35px",
  outline: "none",
  border: "none",
  paddingLeft: "5px",
});

export const NotesList = styles(ListItemButton, {})({
  cursor: 'pointer',
  maxWidth: '100%'
});

export const SelectNote = styles('div')({
  maxWidth: "100%"
});

export const SideButton = styles('div')({
  padding: '5px 2px 1px'
});

export const NoteText = styles(ListItemText, {})({

});



export const AddingButton = styles(SpeedDial, {})({
  position: 'relative',
  bottom: 0,
  left: 0.5
});

export const SpeedDialIconButton = styles(SpeedDialIcon, {})({
  fontSize: '20px',
});

export const DeleteIcon = styles(Delete, {})({
  position: "absolute",
  right: "5px",
  top: "calc(50% - 15px)",
  "&:hover": {
    color: "red"
  }
});

export const ActionList = styles('div')({
  backgroundColor: 'black'
});

export const DropList = styles(ListItem, {})({
  width: '20%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'left'
});

export const DescIcon = styles(DescriptionIcon, {})({
  cursor: 'pointer'
});

export const AddDialog = styles(Dialog, {})({

});

export const CardEditArea = styles('div')({
  [`& .ql-editor`]: {
    minHeight: '20rem'
  }


});


