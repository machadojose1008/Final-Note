import { styled } from '@mui/system';
import backgound from './bg.jpg'

export const SignInComponent = styled('div') ({

    backgroundSize: 'cover'
});

export const SignInContainer = styled('div')({

    width: "500px",
    position: "absolute",
    top: "calc(50% - 250px)",
    left: "calc(50% - 250px)",
    backgroundColor: "rgba(238, 233, 233, 0.7)",
    padding: "50px",
    boxShadow: "2px 2px 5px black",
    borderRadius: "10px",
    color:"black"


});


export const HeaderLogo = styled('header') ({
    fontFamily: "Gundaly",
    marginTop: "50px",
    fontSize:" 70px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
});