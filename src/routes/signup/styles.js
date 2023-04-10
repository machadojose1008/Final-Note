const useStyles = theme => ({
  "@global": {
    body: {
      background: `url(${Image}) center / cover`,
      overflow: "hidden"
    }
  },
  paper: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center"
  },
  title: {
    fontSize: "18px",
    marginBottom: "5px",
    textDecoration: "none"
  },
  avatar: {
    margin: "100px",
    backgroundColor: "#00C170"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "100px"
  },
  submit: {
    margin: "100px"
  },
  errorText: {
    color: "red",
    textAlign: "center"
  },
  link: {
    color: "#000000",
    textDecoration: "none"
  },
  signIn: {
    color: "#00C170",
    textTransform: "upperCase",
    textDecoration: "underline #00C170"
  }
});
  
  export default useStyles;