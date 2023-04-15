import { styled } from "@mui/system";
import { Chip, ListItemButton, ListItemText} from "@mui/material";
import { Delete } from '@mui/icons-material'

export const EditorContainer = styled('div')({
  width: "100%",
  paddingLeft: "1%",
  paddingRight: "1%",
  marginTop: "1%",
});

export const EditorNavBar = styled('div')({
  display: "inline-block",
  backgroundColor: "#1e90ff",
  color: "white",
  borderTopRightRadius: "0.5em",
  flexDirection: "column"
});

export const TitleInput = styled('input')({
  width: "100%",
  border: 'none',
  padding: '20px 30px 30px',
  fontSize: "24px",
  color: "black",
  textAlign: 'left',

});

export const SidebarContainer = styled('div')({
  width: "100%",
  marginTop: "5%",
  paddingLeft: "5%",
  paddingRight: "1%",
});

export const UserIcon = styled(Chip, {})({
  width: "100%",
  marginBottom: "5px"
});

export const NewNoteInput = styled('input')({
  position: "sticky",
  width: "99%",
  margin: "0px",
  height: "35px",
  outline: "none",
  border: "none",
  paddingLeft: "5px",
});

export const NotesList = styled(ListItemButton, {})({
    cursor: 'pointer',
    maxWidth: '100%'
});

export const SelectNote = styled('div')({
  maxWidth: "100%"
});

export const NoteText = styled(ListItemText, {})({

});

export const DeleteIcon = styled(Delete,{})({
  position: "absolute",
  right: "5px",
  top: "calc(50% - 15px)",
  "&:hover": {
    color: "red"
  }
});