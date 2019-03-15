import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// redux
import { connect } from 'react-redux';
import { doLogin } from '../actions/loginAndRegister';

// add material ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import {MySnackbarContentWrapper as Message} from './../helpers/view/CustomizedSnackbars';
import Redirect from "react-router-dom/Redirect";



const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        // marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {

    constructor(props){
        super(props);

        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.rememberRef = React.createRef();
    };

    render() {
        const {classes, onSubmit , dialogHandler ,loggingIn , loggedIn } = this.props;
        const message = this.props.message || {title : ""};


        if(loggedIn){
            return <Redirect to={"/panel/"} />;
        }

        const showRegisterDialog = () => {
            dialogHandler("close", "login");
            dialogHandler("open", "register");
        };

        return (
            <main className={classes.main}>

                {/* LOGIN TOP LOADER */}
                <LinearProgress
                    color={"secondary"}
                    variant={"query"}
                    style={loggingIn ? {marginTop: "10px"} : {display:"none",marginTop: "10px"}}
                />

                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        ورود به سیستم
                    </Typography>

                    {/* MESSAGE FOR LOGIN */}
                    <Message className={"m10 mt15"}
                             variant={message.type || "success"}
                             message={message.title || ""}
                             hasCloseIcon={false}
                             style={(message.title !== "" && !loggingIn) ? {"display":"block"} : {"display":"none"}}
                    />


                    <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">نام کاربری/آدرس ایمیل</InputLabel>
                            <Input inputRef={this.usernameRef} id="username" name="username" autoComplete="username" autoFocus/>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password"> رمز عبور </InputLabel>
                            <Input inputRef={this.passwordRef} name="password"
                                   type="password" id="password" autoComplete="current-password"/>
                        </FormControl>

                        <FormControlLabel
                            control={<Checkbox inputRef={this.rememberRef} value="remember" color="primary"/>}
                            label="مرا بخاطر بسپار"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={
                                () => onSubmit(
                                    this.usernameRef.current.value,
                                    this.passwordRef.current.value,
                                    this.rememberRef.current.value
                                )}
                            color="primary"
                            className={classes.submit}
                        >
                            ورود
                        </Button>

                        <div style={{
                            textAlign: "center",
                            marginTop: "20px",
                            cursor: "pointer"
                        }}>
                            <Typography variant={"caption"} onClick={showRegisterDialog}>هنوز عضو نشده اید
                                ؟</Typography>
                        </div>

                    </form>
                </Paper>
            </main>
        );
    }
}


SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    dialogHandler : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
    message : PropTypes.object,
    loggedIn: PropTypes.bool,
    loggingIn: PropTypes.bool
};


const mapStateToProps = (state) => {
    return {
        loggedIn: state.loginAndRegister.loggedIn,
        loggingIn: state.loginAndRegister.loggingIn,
        message: state.loginAndRegister.message
    };
};


const mapDispatchToProps = (dispatch) => ({
    onSubmit(){
        dispatch({type: "DO_LOGIN_REQUEST"});
        dispatch(doLogin(...arguments));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
