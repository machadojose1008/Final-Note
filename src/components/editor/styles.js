const styles = theme => ({
  editorNavbar: {
    display: "inline-block",
    backgroundColor: "#1e90ff",
    color: "white",
    borderTopRightRadius: "0.5em",
    flexDirection: "column"
  },
  titleInput: {
    borderStyle: "solid",
    fontSize: "24px",
    backgroundColor: "#1e90ff",
    color: "white",
    alignSelf: "center",
    textAlign: 'left',
    "@media only screen and (max-width: 768px)": {
      textAlign: "center",
      width: "96%"
    }

  },
  editIcon: {
    paddingLeft: "10px",
    alignSelf: "flex-start",
    "@media only screen and (max-width: 768px)": {
      alignSelf: "center",
      textAlign: "center"
    }
  },
  editorContainer: {
    width: "81%",
    paddingLeft: "1%",
    paddingRight: "1%",
    marginTop: "1%",
    "@media only screen and (max-width: 768px)": {
      width: "100%"
    }
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    marginLeft: "5px",
    "@media only screen and (max-width: 768px)": {
      flexDirection: "column"
    }
  }
});

export default styles;