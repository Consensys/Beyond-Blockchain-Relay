import auth0 from 'auth0-js';
import authCongif from './auth.config';

class Auth {
  constructor() {
    this.webAuth = new auth0.WebAuth({
      domain: authCongif.domain,
      clientID: authCongif.client_id,
      audience: authCongif.audience,
      responseType: authCongif.response_type,
      scope: authCongif.scope,
      redirectUri: 'http://gossamer-hackathon.3rmpaa9m4m.us-west-2.elasticbeanstalk.com/verifycredentials',
    });
  }

  handleAuthentication = () => (
    new Promise((resolve, reject) => {
      this.webAuth.parseHash({ hash: window.location.hash }, async (err, authResult) => {
        if (err) {
          reject(err);
        }
        if (!authResult || !authResult.accessToken) {
          reject(err);
        } else {
          this.storeData(authResult);
          resolve();
        }
      });
    })
  )

  silentAuth = async () => (
    new Promise((resolve, reject) => {
      this.webAuth.checkSession({}, async (err, authResult) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          this.storeData(authResult);
          resolve();
        }
      });
    })
  )

  storeData = (authResult) => {
    this.accessToken = authResult.accessToken;
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.email = authResult.idTokenPayload.name;
    [, this.userId] = authResult.idTokenPayload.sub.split('|');
  }

  isAuthenticated = () => (this.accessToken && (new Date().getTime() < this.expiresAt))

  login = (email, password) => (
    new Promise((resolve, reject) => {
      this.webAuth.login({
        realm: 'Username-Password-Authentication',
        email,
        password,
      }, (err) => {
        if (err) {
          console.log('Something went wrong: ', err);
          reject(err);
        } else {
          resolve();
        }
      });
    })
  )

  signup = (email, password, firstName) => (
    new Promise((resolve, reject) => {
      this.webAuth.signup({
        connection: 'Username-Password-Authentication',
        email,
        password,
        user_metadata: { firstName },
      }, (err) => {
        if (err) {
          console.log('Something went wrong: ', err);
          reject(err);
        } else {
          this.login(email, password);
          resolve();
        }
      });
    })
  )

  logout = () => {
    this.accessToken = null;
    this.expiresAt = null;
    this.userEmail = null;
    this.userId = null;
    this.webAuth.logout({
      returnTo: 'http://gossamer-hackathon.3rmpaa9m4m.us-west-2.elasticbeanstalk.com/',
      clientID: authCongif.client_id,
    });
  }
}

const auth0Client = new Auth();
export default auth0Client;
