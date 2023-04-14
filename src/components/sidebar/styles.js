const styles = theme => ({
  root: {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 2px black'
  },
  newChatBtn: {},
  newNoteBtn: {},
  sidebarContainer: {
    sidebarContainer: {
      width: "50%",
      marginTop: "1%",
      paddingLeft: "10%",
      paddingRight: "1%",
      "@media only screen and (max-width: 768px)": {
        width: "100%",
        height: "40%",
        overflowY: "scroll"
      }
    }
  },
  newNoteInput: {
    position: "sticky",
    width: "99%",
    margin: "0px",
    height: "35px",
    outline: "none",
    border: "none",
    paddingLeft: "5px",
    "&:focus": {
      outline: "2px solid rgba(81, 203, 238, 1)"
    }
  },
  newNoteSubmitBtn: {},

  /*
    Icone Usuário
  */
  chip: {
    width: "100%",
    marginBottom: "5px"
  }
});

export default styles;