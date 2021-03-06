import * as React from 'react';
import PropTypes from 'prop-types';

import { useLocation, Navigate } from 'react-router-dom';

const AuthContext = React.createContext(null);

function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    function signin(newUser, callback) {
        setUser(newUser);
        if (callback) callback();
    }
    function signout(callback) {
        setUser(null);
        if (callback) callback();
    }

    const value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

AuthProvider.propTypes = {
    children: PropTypes.node
};

RequireAuth.propTypes = {
    children: PropTypes.node
};

export { useAuth, AuthProvider, RequireAuth, AuthContext };
