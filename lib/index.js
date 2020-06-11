"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./index.css");
class GoogleLoginButton extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getUrlParameter(searchParameter) {
        let params = window.location.search;
        let pageUrl = '';
        try {
            pageUrl = decodeURIComponent(params.substr(1));
        }
        catch (err) { }
        if (pageUrl !== '') {
            let urlVariable = pageUrl.split('&');
            let parameterName;
            for (let i = 0; i < urlVariable.length; i++) {
                parameterName = urlVariable[i].split('=');
                if (parameterName[0] === searchParameter) {
                    if (parameterName[1] !== undefined) {
                        return parameterName[1];
                    }
                    return '';
                }
            }
        }
        return '';
    }
    componentDidMount() {
        const google_code = this.getUrlParameter('code');
        const google_error = this.getUrlParameter('error');
        google_code
            ? this.props.onLogin(google_code)
            : this.props.onError(google_error);
    }
    getLoginUrl() {
        const googleParams = this.props.googleProps;
        const availableParams = [];
        if (googleParams.scope) {
            availableParams.push(`scope=${googleParams.scope}`);
        }
        if (googleParams.response_type) {
            availableParams.push(`response_type=${googleParams.response_type}`);
        }
        if (googleParams.client_id) {
            availableParams.push(`client_id=${googleParams.client_id}`);
        }
        if (googleParams.access_type) {
            availableParams.push(`access_type=${googleParams.access_type}`);
        }
        if (googleParams.redirect_uri) {
            availableParams.push(`redirect_uri=${googleParams.redirect_uri}`);
        }
        if (googleParams.prompt) {
            availableParams.push(`prompt=${googleParams.prompt}`);
        }
        const URL = `https://accounts.google.com/o/oauth2/v2/auth?${availableParams.join('&')}`;
        return URL;
    }
    render() {
        const url = this.getLoginUrl();
        return (react_1.default.createElement("div", { className: "GoogleLoginWrapper" },
            react_1.default.createElement("a", { className: "GoogleLogin", href: url }, "Sign in with your google account")));
    }
}
exports.default = GoogleLoginButton;
//# sourceMappingURL=index.js.map