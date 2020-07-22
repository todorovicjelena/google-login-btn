import { Component } from 'react';
import './index.css';
export interface GoogleProps {
    [x: string]: any;
    client_id: string;
    redirect_uri: string;
    scope?: string;
    response_type?: string;
    access_type?: string;
    prompt?: string;
}
export interface LoginProps {
    googleProps: GoogleProps;
}
declare class GoogleLoginButton extends Component<LoginProps, {}> {
    constructor(props: Readonly<LoginProps>);
    getLoginUrl(): string;
    render(): JSX.Element;
}
export default GoogleLoginButton;
