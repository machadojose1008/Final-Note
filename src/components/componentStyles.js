import { styled as styles } from "@mui/system";
import { Chip, ListItemButton, ListItemText, ListItem, SpeedDial, Dialog, CardContent, Box } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { Delete, HeightTwoTone } from '@mui/icons-material'
import DescriptionIcon from '@mui/icons-material/Description'
import styled  from '@emotion/styled'

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
  marginTop:'2%',
  marginLeft:'5%',
});

export const ButtonContainer = styles('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '5px',
})

export const SrsReview = styles(Box, {})({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 400,
  background:'white',
  justifyContent:'center',
  WebkitBorderBottomRightRadius: '1em',
  WebkitBorderBottomLeftRadius: '1em',
  WebkitBorderTopRightRadius: '1em',
  WebkitBorderTopLeftRadius: '1em',
});

export const StyledCardContent = styles(CardContent, {})({
  paddingTop:'30px',
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
  border:'solid',
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

export const SideButton = styles('div') ({
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

export const ActionList = styles('div') ({
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

export const AddDialog = styles(Dialog, {}) ({

});

export const CardEditArea = styled.div`
  .ql-editor{
    min-height: 20rem;
  }

`;

