import React from 'react';

import PropTypes from 'prop-types';
import HeadSeo from "../helpers/buildHeadSeo";

import {NavLink} from "react-router-dom";


function NotFound(props) {
    const {classes} = props;

    const reasons = [
        "آدرس صفحه ای که وارد شده اید تغییر یافته باشد.",
        "بنا به دلیلی سیستم از دسترس خارج شده باشد.",
        "مطلب مورد نظر حذف شده باشد."
    ];

    return (
        <main className={classes.main}>
            <HeadSeo
                name={"صفحه مورد نظر پیدا نشد !"}
                address={"/" + window.location.pathname}
                description={"صفحه مورد نظر پیدا نشد !"}
                image={""}
            />
            <Paper className={classes.paper}>
                <Icon
                    color={"primary"}
                    style={{
                        margin: "25px",
                        fontSize : "4rem"
                    }}
                >wifi_off</Icon>

                <Typography className={"m15"} component="h2" variant="h2">404</Typography>
                متاسفیم ، صفحه مورد نظر پیدا نشد !

                <NavLink
                    exact
                    key={"/"}
                    to="/"
                    style={{fontSize: 12,margin:'12px 0',color: '#87e848',fontWeight: 900}}
                >
                    بازگشت به صفحه اصلی
                </NavLink>
                <div className={classes.description}>
                    <Typography component="h6" variant="caption">این خطا ممکن است به یکی از دلایل زیر رخ داده باشد :</Typography>
                    <ul>
                        {reasons.map(item => (
                            <Typography
                                key={item}
                                className={classes.descriptionList}
                                component="li"
                                variant="overline"
                            >
                                <Icon style={{fontSize:"10px"}}>check</Icon> {item}
                            </Typography>
                        ))}
                    </ul>
                </div>
            </Paper>
        </main>
    );
}



NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
