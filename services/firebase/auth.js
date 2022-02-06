import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { app } from './firebase';

class AuthService {

    static signInState = {
        signedOut: 'signedOut',
        signedIn: 'signedIn',
        signingIn: 'signingIn',
    }

    constructor() {
        this.googleAuth = new GoogleAuthProvider();
        this.user = null;
        this.auth = getAuth(app);
        this.userListeners = [];

        onAuthStateChanged(this.auth, user => {
            this.user = user;
            this.#notifyUserListeners();
        })
    }

    #notifyUserListeners() {
        for (let i = 0; i < this.userListeners.length; i++) {
            this.userListeners[i].callback();
        }
    }

    addUserListener(callback, key = '') {
        this.userListeners.push({ callback: callback, key: key, });
    }

    removeUserListener(callback, key = '') {
        let index = -1;
        for (let i = 0; i < this.userListeners.length; i++) {
            if (key !== '') {
                if (this.userListeners[i].key === key) {
                    index = i;
                    break;
                }
            } else if (this.userListeners[i].callback === callback) {
                index = i;
                break;

            }
        }
        if (index !== -1) {
            this.userListeners = this.userListeners.splice(index, 1);
        }
    }

    async signOut() {
        await this.auth.signOut();
    }

    async signInWithGoogle() {
        await signInWithPopup(this.auth, this.googleAuth);
    }
}

let authService = null;

export default function getAuthService() {
    if (authService === null) {
        authService = new AuthService();
    }

    return authService;
}
