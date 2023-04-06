const styles = theme => ({
    body: {
        width: '100%',
        height: '100%',
    },
    'body': {
        '-webkit-background-size': 'cover',
        backgroundSize: 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
    },
    '.form-group': {
        display: 'none',
    },
    '.form-container': {
        width: '500px',
        position: 'absolute',
        top: 'calc(50% - 250px)',
        left: 'calc(50% - 250px)',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '50px',
        boxShadow: '2px 2px 5px black',
        borderRadius: '10px',
        color: 'white',
    },
    '#next-button:disabled': {
        cursor: 'not-allowed',
    },
    '.invalid': {
        border: '2px solid red !important',
    },
    '#next-button': {
        width: '100%',
    },
    '#back-button': {
        fontSize: '40px',
        display: 'inline-block',
        cursor: 'pointer',
    },
    '#back-button:hover': {
        color: 'lightblue',
    },
    '.password-requirements': {
        color: 'red',
        fontWeight: 'bold',
    }

});

export default styles;