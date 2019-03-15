import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';


import {connect} from "react-redux";
import {NavLink} from "react-router-dom";


// fot appbar
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Dialog from '@material-ui/core/Dialog';


// import login and logout actions
import { doLogout } from './../../../actions/loginAndRegister';
import LoginForm from './../../LoginForm';
import RegisterForm from './../../RegisterForm';


// icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';



// Main styles to top app bar related things
const styles = theme => {
    return ({
        root: {
            width: '100%',
            minHeight: "80px !important",
            marginBottom : "20px"
        },
        appbar: {
            position : 'fixed',
        },

        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        title: {
            display: 'none',
            fontSize: '20px',
            fontWeight: 900,
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            '&:focus': {
                backgroundColor: theme.palette.common.white,
            },
            marginRight: theme.spacing.unit * 2,
            marginLeft: 0,
            width: '100%',
            transition : 'all 0.3s ease-in-out',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing.unit * 3,
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing.unit * 6,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        inputInput: {
            paddingTop: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 6,
            transition: theme.transitions.create('width'),
            width: '100%',
            color: '#fff !important',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    });
};

class Header extends React.Component {

    constructor(props){
        super(props);
        this.child = React.createRef();
    }

    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        loginModal : false,
        registerModal : false
    };

    componentDidMount() {
        /**
         * To let login modal open from index
         */
        const onClickRef = this.props.onClickRef || function(){};
        onClickRef(this);
    }

    handleProfileMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({mobileMoreAnchorEl: event.currentTarget});
    };

    handleMobileMenuClose = () => {
        this.setState({mobileMoreAnchorEl: null});
    };



    handleLoginModal = (state , dialog) => {
        let stateName;
        if(dialog === "login"){
            stateName = "loginModal";
        }else{
            stateName = "registerModal"
        }

        if(state === "open") {
            this.handleMenuClose();
            this.setState({
                [stateName]: true
            })
        }else{
            this.setState({
                [stateName] : false
            })
        }
    };

    toggleDrawer = () => {
        this.child.current.toggleDrawer('left', true)()
    };

    render() {
        const {anchorEl, mobileMoreAnchorEl} = this.state;
        const {classes , loggedIn , submitLogout, csrf_token} = this.props;
        const user = this.props.user;

        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                {loggedIn ?

                    // logged in
                    [
                        <NavLink
                            exact
                            key={"/panel"}
                            activeClassName="bg-white"
                            to="/panel"
                        >
                            <MenuItem onClick={this.handleMenuClose}>
                            داشبورد
                            </MenuItem>
                        </NavLink>,
                        <NavLink
                            exact
                            key={"/account"}
                            activeClassName="bg-white"
                            to="/panel/account"
                        >
                            <MenuItem onClick={this.handleMenuClose}>
                                حساب کاربری
                            </MenuItem>
                        </NavLink>,
                        <MenuItem key="/logout" onClick={() => {
                            submitLogout(csrf_token);
                            this.handleMenuClose();
                        }}>خروج</MenuItem>
                    ] :

                    // not logged in
                    [
                        <MenuItem key="/logout" onClick={() => this.handleLoginModal("open" , "register")}>ساخت حساب کاربری</MenuItem>,
                        <MenuItem key="/login" onClick={() => this.handleLoginModal("open" , "login")}>ورود به سیستم</MenuItem>
                    ]
                }
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                {/*{loggedIn ?*/}
                    {/*<MenuItem>*/}
                        {/*<IconButton color="inherit">*/}
                            {/*<Badge badgeContent={11} color="secondary">*/}
                                {/*<NotificationsIcon/>*/}
                            {/*</Badge>*/}
                        {/*</IconButton>*/}
                        {/*<p>اطلاعیه ها</p>*/}
                    {/*</MenuItem>*/}
                    {/*:*/}
                    {/*""*/}
                {/*}*/}
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle/>
                    </IconButton>
                    <p>پنل کاربری</p>
                </MenuItem>
            </Menu>
        );

        const loginAndRegisterModal = (
            <React.Fragment>
                <Dialog
                    open={this.state.loginModal}
                    onClose={() => this.handleLoginModal("close" , "login")}
                >
                    <LoginForm dialogHandler={this.handleLoginModal} />
                </Dialog>
                <Dialog
                    open={this.state.registerModal}
                    onClose={() => this.handleLoginModal("close" , "register")}
                >
                    <RegisterForm dialogHandler={this.handleLoginModal} />
                </Dialog>
            </React.Fragment>
        );


        return (
            <div className={classes.root}>

                <Toolbar style={{zIndex: 999}}>

                    <NavLink
                        exact
                        key={"/"}
                        activeClassName="activeLink"
                        to="/"
                    >
                        <Typography className={classes.title} variant="h1" color="inherit">
                            {process.env.APP_NAME}
                        </Typography>
                    </NavLink>

                    <div className={classes.grow}/>

                    <div className={classes.sectionDesktop}>
                        {/*{loggedIn ?*/}
                            {/*<IconButton color="inherit">*/}
                                {/*<Badge badgeContent={1} color="secondary">*/}
                                    {/*<NotificationsIcon/>*/}
                                {/*</Badge>*/}
                            {/*</IconButton> :*/}
                            {/*""*/}
                        {/*}*/}
                        <IconButton
                            aria-owns= {isMenuOpen ? 'material-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleProfileMenuOpen}
                            color="inherit"
                            >
                            <AccountCircle/>
                        </IconButton>
                    </div>

                    <div className={classes.sectionMobile}>
                        <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                            <MoreIcon/>
                        </IconButton>
                    </div>

                </Toolbar>

                {renderMenu}
                {renderMobileMenu}


                {/* If user not logged in*/}
                {loginAndRegisterModal}
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => {
    return {
        loggedIn: state.loginAndRegister.loggedIn,
        user: state.loginAndRegister.userInfo,
        csrf_token: state.csrf_token._token
    };
};


const mapDispatchToProps = (dispatch) => ({
    submitLogout(token){
        dispatch(doLogout(token));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
