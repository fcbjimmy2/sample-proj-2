// database
import { userDb } from '../../database'
//
import jwt from 'jsonwebtoken';
import { I18n } from 'i18n';
import { LANGUAGES } from '../config';
import path from 'path';
import { userAgentFromString } from "next/server";
// config
import { BASE_URL } from '../config';
// only office auth
import { onlyofficeAuth } from '../../helper/onlyoffice';

const getI18n = (req) => {
    const { headers } = req;
    const localeCodes = LANGUAGES.map(e => e.value);
    const acceptLocaleCode = localeCodes.find(e => e === headers['accept-language']);
    return new I18n({
        locales: localeCodes,
        defaultLocale: acceptLocaleCode??'en',
        directory: path.join('src', 'utils', 'locales'),
        parser: JSON
    });
}

/**
 * apiGuestGuard(request, response, callback)
 * 
 * apiGuestGuard(request, response, allowedMothods, callback)
 */
export const apiGuestGuard = (req, res, ...args) => {   
    const i18n = getI18n(req); 
    try {
        let allowedMothods = ['GET'];
        let next;
        if (args.length === 1 && typeof args[0] === 'function') {
            next = args[0];
        } else if (args.length === 2 && Array.isArray(args[0]) && typeof args[1] === 'function') {
            allowedMothods = args[0];
            next = args[1];
        } else {
            console.log('Parameter of API Guest Guard is not a correct!');
            return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }

        const { headers, method, body } = req;

        if (!!body && headers['content-type'] !== 'application/json') {
            return res.status(415).json({ message: i18n.__('unsupported-media-type') });
        } 

        if (!allowedMothods.includes(method)) {
            return res.status(405).json({ message: i18n.__('method-not-allowed') });
        }

        return next(i18n);
    } catch (e) {        
        console.log('API Guest Guard: ' + e);
        return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
    }
};

/**
 * apiAuthGuard(request, response, callback)
 * 
 * apiAuthGuard(request, response, allowedMothods, callback)
 * 
 * apiAuthGuard(request, response, allowedMothods, allowedRoles, callback)
 */
export const apiAuthGuard = (req, res, ...args) => { 
    const i18n = getI18n(req); 
    try {
        let allowedMothods = ['GET'];
        let allowedRoles = [];
        let next;
        if (args.length === 1 && typeof args[0] === 'function') {
            next = args[0];
        } else if (args.length === 2 && Array.isArray(args[0]) && typeof args[1] === 'function') {
            allowedMothods = args[0];
            next = args[1];
        } else if (args.length === 3 && Array.isArray(args[0]) && Array.isArray(args[1]) && typeof args[2] === 'function') {
            allowedMothods = args[0];
            allowedRoles = args[1];
            next = args[2];
        } else {
            console.log('Parameter of API Auth Guard is not a correct!');
            return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }

        const { headers, method, body } = req;

        if (!!body && headers['content-type'] !== 'application/json' && headers['content-type'] !== 'multipart/form-data') {
            return res.status(415).json({ message: i18n.__('unsupported-media-type') });
        } 

        if (!allowedMothods.includes(method)) {
            return res.status(405).json({ message: i18n.__('method-not-allowed') });
        } 

        const csrfToken = headers['x-csrf-token'];
        const authorization = headers['authorization']?.trim();

        if (!csrfToken || !authorization) {
            return res.status(401).json({message: i18n.__('unauthorized') });
        } 
        if (authorization.split(' ').length !== 2) {
            return res.status(401).json({message: i18n.__('unauthorized') });
        } 

        const jwtToken = authorization.split(' ')[1];
        
        jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET, async (err, decodedData) => {
            if (err) {
                return res.status(401).json({message: i18n.__('unauthorized') });
            }
        
            try {
                const { os, browser } = userAgentFromString(headers['user-agent']);
                
                const user = await userDb.getUserByDevice(decodedData.id, browser.name, os.name, csrfToken, decodedData.access_token); 
                
                if (allowedRoles.length > 0 && !allowedRoles.includes(user.app)) {
                    return res.status(403).json({message: i18n.__('forbidden') });
                }

                const onlyoffice_token = await onlyofficeAuth.getAuthTokenByUser(user.email);

                return next(
                    i18n,
                    {
                        id: user.user_guid,
                        username: user.username, 
                        password: user.password, 
                        role: user.app, 
                        email: user.email,
                        full_name: user.full_name,
                        photo: user.photo??`${BASE_URL}/avatars/user.png`,
                        access_token: decodedData.access_token,
                        onlyoffice_token: onlyoffice_token
                    }
                );
            } catch(e) {
                return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
            }
        });
    } catch (e) {        
        console.log('API Auth Guard: ' + e);
        return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
    }
};
