import { styled as styles } from "@mui/system";
import { Chip, ListItemButton, ListItemText, ListItem, SpeedDial, Dialog, CardContent, Box, Typography, IconButton, MenuItem, Menu } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { Delete} from '@mui/icons-material'
import DescriptionIcon from '@mui/icons-material/Description'
import { blue, grey } from "@mui/material/colors";

export const EditorContainer = styles('div')({
  width: "100%",
  paddingLeft: "1%",
  paddingRight: "1%",
  marginTop: "1%",
});

export const EditorNavBar = styles('div')({
  display: "flex",
  flexDirection: 'row',
  color: "white",
  width:'100%',
  borderTopRightRadius: "0.5em",
});



export const CardEditorTitle = styles('div')({
  display:'flex',
  flexDirection:'row',
  width:'100%',
  height: '100%'

})

export const StudyComponentDiv = styles('div')({
  marginTop: '2%',
  marginLeft: '5%',
});


export const ButtonContainer = styles('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '5px',
});

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
  width: "80%",
  display: 'block',
  padding:'4px, 0 5px',
  fontSize: "24px",
  color: "black",
  boxSizing: 'content-box',
  background: 'none',
  height: '1.4375em',
  WebkitTapHighlightColor:'transparent',
  paddingTop: '25px',
  paddingRight: '12px',
  paddingBottom: '8px',
  paddingLeft: '12px',
  textAlign: 'left',
  WebkitBorderBottomRightRadius: '0.5em',
  WebkitBorderBottomLeftRadius: '0.5em',
  WebkitBorderTopRightRadius: '0.5em',
  WebkitBorderTopLeftRadius: '0.5em',
  border: 'none',
  ":focus-visible" : {
    outline: 'none'
  }
});

export const Title = styles('div')({
  color:'black',
  fontSize: '20px',
  height: '12px'

});

export const DateShow = styles('div')({
  color:'black'

})

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

/* Estilos do Chat */

export const SidebarChat = styles('div')({
  flex:'1',
  backgroundColor: "#e9e9e9",
  height:'700px'
});

export const Chat = styles('div')({
  flex:'3.5',
  maxHeight:'570px',
  maxWidth:'900px'
});

export const NavBarDiv = styles('div')({
  display:'flex',
  alignItems:'center',
  backgroundColor:'#cfcfcf',
  height:'50px',
  justifyContent:'space-between',
});

export const ChatComponentDiv = styles('div')({
  marginTop: '25%',
  marginLeft: '2%',
  height:'80%'
});







