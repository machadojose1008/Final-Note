const styles = theme => ({
  editorNavbar: {
    display: "inline-block",
    backgroundColor: "#1e90ff",
    color: "white",
    borderTopRightRadius: "0.5em",
    flexDirection: "column"
  },
  titleInput: {
    width: "100%",
    border: 'none',
    padding: '20px 30px 30px',
    fontSize: "24px",
    color: "black",
    textAlign: 'left',
    "@media only screen and (max-width: 768px)": {
      textAlign: "center",
      width: "96%"
    }
  },
  editorContainer: {
    width: "100%",
    paddingLeft: "1%",
    paddingRight: "1%",
    marginTop: "1%",
    gridArea: "1/ 2/ 2/ 6",
    "@media only screen and (max-width: 768px)": {
      width: "100%"
    }
  }
});

export default styles;