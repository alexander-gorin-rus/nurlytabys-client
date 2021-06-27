import axios from 'axios';

const entryAuthToken = token => {
    if(token){
        axios.defaults.headers.common['entry-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['entry-auth-token']
    }
}

export default entryAuthToken;