"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
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
        return (react_1.default.createElement("div", { className: "LoginWrapper" },
            react_1.default.createElement("a", { className: "Login", href: url }, "Sign in with your google account")));
    }
}
exports.default = GoogleLoginButton;
//# sourceMappingURL=index.js.map