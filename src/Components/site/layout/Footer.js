import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Icon from "@material-ui/core/Icon/Icon";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid/Grid";
import {NavLink} from "react-router-dom";


const styles = theme => ({
    footer : {
        marginTop: "20px" ,
        marginBottom: "60px" ,
        textAlign: "center",
        position: "relative",
        '&:hover' : {
            footerIcon: {
                opacity: "1",
                color: "#a1b1e8"
            }
        },
    },
    footerIcon: {
        transition : "all 0.3s ease-in-out",
        opacity: "0.15",
        fontSize:"40px",
        '&:hover' : {
            opacity: "1",
            color: "#a1b1e8",
            cursor: "pointer"
        },
        position:"relative",
        bottom : "-2px"
    },

    footerColumns: {
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 2}px 0`,
        '& a': {
            color: '#333'
        }
    },
});


/**
 * List of footer links
 * @type {*[]}
 */
const footers = [
    {
        title: 'طرفه نگار',
        description: [{
            url: 'http://torfehnegar.com',
            target: '_blank',
            title: 'وبسایت طرفه نگار'
        }, {
            url: 'http://holoo.com.ir',
            target: '_blank',
            title: 'نرم افزار هلو'
        }, {
            url: 'http://spad.ir',
            target: '_blank',
            title: 'نرم افزار اسپاد'
        }],
    },
    {
        title: 'کارریز',
        description: [{
            url: '/faq',
            title: 'سوالات متداول'
        }, {
            url: '/guide',
            title: 'راهنمای استفاده'
        }, {
            url: '/contact',
            title: 'تماس با ما'
        }, {
            url: '/about',
            title: 'درباره ما'
        }],
    },
    {
        title: 'قوانین',
        description: [{
            url: '/privacy',
            title: 'سیاست حریم خصوصی'
        }, {
            url: '/rules',
            title: 'قوانین استفاده'
        }],
    }
];



function Footer(props){
    const {classes} = props;

    return (
        <React.Fragment>

            <div className={"footerHolder"}>
                <div>
                    <svg preserveAspectRatio="xMidYMax meet" className={"svg-separator wavedFooterSvg"} viewBox="0 0 1600 100" data-height="100">
                        <path className={""} style={{opacity: 1,fill: "rgb(69, 88, 182)"}} d="M1040,56c0.5,0,1,0,1.6,0c-16.6-8.9-36.4-15.7-66.4-15.7c-56,0-76.8,23.7-106.9,41C881.1,89.3,895.6,96,920,96
C979.5,96,980,56,1040,56z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(69, 88, 182)"}} d="M1699.8,96l0,10H1946l-0.3-6.9c0,0,0,0-88,0s-88.6-58.8-176.5-58.8c-51.4,0-73,20.1-99.6,36.8
c14.5,9.6,29.6,18.9,58.4,18.9C1699.8,96,1699.8,96,1699.8,96z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(69, 88, 182)"}} d="M1400,96c19.5,0,32.7-4.3,43.7-10c-35.2-17.3-54.1-45.7-115.5-45.7c-32.3,0-52.8,7.9-70.2,17.8
c6.4-1.3,13.6-2.1,22-2.1C1340.1,56,1340.3,96,1400,96z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(69, 88, 182)"}} d="M320,56c6.6,0,12.4,0.5,17.7,1.3c-17-9.6-37.3-17-68.5-17c-60.4,0-79.5,27.8-114,45.2
c11.2,6,24.6,10.5,44.8,10.5C260,96,259.9,56,320,56z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(69, 88, 182)"}} d="M680,96c23.7,0,38.1-6.3,50.5-13.9C699.6,64.8,679,40.3,622.2,40.3c-30,0-49.8,6.8-66.3,15.8
c1.3,0,2.7-0.1,4.1-0.1C619.7,56,620.2,96,680,96z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(69, 88, 182)"}} d="M-40,95.6c28.3,0,43.3-8.7,57.4-18C-9.6,60.8-31,40.2-83.2,40.2c-14.3,0-26.3,1.6-36.8,4.2V106h60V96L-40,95.6
z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(185, 193, 2)"}} d="M504,73.4c-2.6-0.8-5.7-1.4-9.6-1.4c-19.4,0-19.6,13-39,13c-19.4,0-19.5-13-39-13c-14,0-18,6.7-26.3,10.4
C402.4,89.9,416.7,96,440,96C472.5,96,487.5,84.2,504,73.4z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(185, 193, 2)"}} d="M1205.4,85c-0.2,0-0.4,0-0.6,0c-19.5,0-19.5-13-39-13s-19.4,12.9-39,12.9c0,0-5.9,0-12.3,0.1
c11.4,6.3,24.9,11,45.5,11C1180.6,96,1194.1,91.2,1205.4,85z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(185, 193, 2)"}} d="M1447.4,83.9c-2.4,0.7-5.2,1.1-8.6,1.1c-19.3,0-19.6-13-39-13s-19.6,13-39,13c-3,0-5.5-0.3-7.7-0.8
c11.6,6.6,25.4,11.8,46.9,11.8C1421.8,96,1435.7,90.7,1447.4,83.9z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(185, 193, 2)"}} d="M985.8,72c-17.6,0.8-18.3,13-37,13c-19.4,0-19.5-13-39-13c-18.2,0-19.6,11.4-35.5,12.8
c11.4,6.3,25,11.2,45.7,11.2C953.7,96,968.5,83.2,985.8,72z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(185, 193, 2)"}} d="M743.8,73.5c-10.3,3.4-13.6,11.5-29,11.5c-19.4,0-19.5-13-39-13s-19.5,13-39,13c-0.9,0-1.7,0-2.5-0.1
c11.4,6.3,25,11.1,45.7,11.1C712.4,96,727.3,84.2,743.8,73.5z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(185, 193, 2)"}} d="M265.5,72.3c-1.5-0.2-3.2-0.3-5.1-0.3c-19.4,0-19.6,13-39,13c-19.4,0-19.6-13-39-13
c-15.9,0-18.9,8.7-30.1,11.9C164.1,90.6,178,96,200,96C233.7,96,248.4,83.4,265.5,72.3z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(185, 193, 2)"}} d="M1692.3,96V85c0,0,0,0-19.5,0s-19.6-13-39-13s-19.6,13-39,13c-0.1,0-0.2,0-0.4,0c11.4,6.2,24.9,11,45.6,11
C1669.9,96,1684.8,96,1692.3,96z" />
                        <path className={""} style={{opacity: 1,fill: "rgb(185, 193, 2)"}} d="M25.5,72C6,72,6.1,84.9-13.5,84.9L-20,85v8.9C0.7,90.1,12.6,80.6,25.9,72C25.8,72,25.7,72,25.5,72z" />
                        <path className={""} style={{fill: "rgb(244, 244, 245)"}} d="M-40,95.6C20.3,95.6,20.1,56,80,56s60,40,120,40s59.9-40,120-40s60.3,40,120,40s60.3-40,120-40
s60.2,40,120,40s60.1-40,120-40s60.5,40,120,40s60-40,120-40s60.4,40,120,40s59.9-40,120-40s60.3,40,120,40s60.2-40,120-40
s60.2,40,120,40s59.8,0,59.8,0l0.2,143H-60V96L-40,95.6z" />
                    </svg>
                </div>

                <footer className={"mainContainer"}>
                    <div className={classNames(classes.footerColumns)}>
                        <Grid container spacing={32} justify="space-evenly">
                            {footers.map(footer => (
                                <Grid item xs key={footer.title}>
                                    <Typography className={"byekan"} variant="h6" color="textPrimary" gutterBottom>
                                        {footer.title}
                                    </Typography>
                                    {footer.description.map(item => (
                                        <Typography href={item.link} key={item.title} component={"li"} variant="subtitle1" color="textSecondary">
                                            {item.url.toString().toLowerCase().indexOf("http://") > -1 ?
                                                <a href={item.url} target={item.target || ''}>{item.title}</a> :
                                                <NavLink
                                                    exact
                                                    key={item.url}
                                                    activeClassName="bg-white"
                                                    to={item.url}
                                                >
                                                    {item.title}
                                                </NavLink>
                                            }
                                        </Typography>
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </div>

                    <div className={classes.footer}>
                        <Icon className={classes.footerIcon}>fingerprint</Icon>
                        <Typography variant="subtitle1" align="center" gutterBottom>
                            تیم توسعه وب طرفه نگار
                        </Typography>
                        <Typography variant="subtitle2" align="center" color="textSecondary" component="p">
                            تجربه ای متفاوت و لذت بخش از تکنولوژی
                        </Typography>
                    </div>
                </footer>
            </div>


        </React.Fragment>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);


