import React, {ReactElement} from "react";
import {css, StyleSheet} from "aphrodite";
import {fadeIn} from "react-animations";

interface CustomModalProps {
    header: React.FC | ReactElement
    title: React.FC | ReactElement
    body: React.FC | ReactElement
    actions: React.FC | ReactElement
}

const CustomModal: React.FC<CustomModalProps> = ({header, title, body, actions}) => {
    return (
        <div className="auth-modal__background">
            <div className={["auth-modal__container bg-info", css(styles.fadeIn)].join(" ")}>
                <div className="auth-modal__header">{header}</div>
                <div className="auth-modal__title">{title}</div>
                <div className={"auth-modal__content"}>{body}</div>
                <div className="auth-modal__actions">{actions}</div>
            </div>
        </div>
    )
}

export default CustomModal

const styles = StyleSheet.create({
    fadeIn: {
        animationName: fadeIn,
        animationDuration: '2s',
    }
})
