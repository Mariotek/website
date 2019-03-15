import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';


// redux
import { connect } from 'react-redux';
import { doRegister } from '../actions/loginAndRegister';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PersonAddIcon from '@material-ui/icons/PersonAddRounded';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {MySnackbarContentWrapper as Message} from './../helpers/view/CustomizedSnackbars';



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



class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.usernameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordRepeatRef = React.createRef();
    }

    render() {
        const {classes, onSubmit , dialogHandler ,signingUp , signedUp} = this.props;
        const message = this.props.message || {title : ""};


        const showLoginDialog = () => {
            dialogHandler("close", "register");
            dialogHandler("open", "login");
        };

        if(signedUp){
            showLoginDialog();
        }


        return (
            <main className={classes.main}>

                {/* LOGIN TOP LOADER */}
                <LinearProgress color={"secondary"} variant={"query"}
                                style={signingUp ? {marginTop: "10px"} : {display:"none",marginTop: "10px"}}
                />

                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddIcon/>
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        افتخار عضویت می دهید؟
                    </Typography>



                    {/* MESSAGE FOR LOGIN */}
                    <Message className={"m10 mt15"}
                             variant={message.type || "success"}
                             message={message.title || ""}
                             hasCloseIcon={false}
                             style={(message.title !== "" && !signingUp) ? {"display":"block"} : {"display":"none"}}
                    />


                    <form className={classes.form} onSubmit={(e) => e.preventDefault()}>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">نام کاربری</InputLabel>
                            <Input inputRef={this.usernameRef} id="username" name="username" autoComplete="username" autoFocus/>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">آدرس ایمیل</InputLabel>
                            <Input inputRef={this.emailRef} id="email" name="email" autoComplete="email"/>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">رمز عبور</InputLabel>
                            <Input inputRef={this.passwordRef} name="password" type="password" id="password" autoComplete="current-password"/>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">تکرار رمز عبور</InputLabel>
                            <Input inputRef={this.passwordRepeatRef} name="passwordRepeat" type="password" id="passwordRepeat"
                                   autoComplete="current-password"/>
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => onSubmit(
                                this.usernameRef.current.value,
                                this.emailRef.current.value,
                                this.passwordRef.current.value,
                                this.passwordRepeatRef.current.value
                            )}
                            className={classes.submit}
                        >
                            عضویت
                        </Button>

                        <div style={{
                            textAlign: "center",
                            marginTop: "20px",
                            cursor: "pointer"
                        }}>
                            <Typography variant={"caption"} onClick={showLoginDialog}>میخواهید وارد حساب کاربری خود
                                شوید؟</Typography>
                        </div>
                    </form>
                </Paper>
            </main>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    dialogHandler : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
    message : PropTypes.object,
    signedUp: PropTypes.bool,
    signingUp: PropTypes.bool
};

const mapStateToProps = (state) => {
    console.log("MapStateToProps ::: " , state);
    return {
        signingUp: state.loginAndRegister.signingUp,
        signedUp: state.loginAndRegister.signedUp,
        message: state.loginAndRegister.message
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch ,
    onSubmit(){
        dispatch({type: "DO_REGISTER_REQUEST"});
        dispatch(doRegister(...arguments))
    }
});





export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
