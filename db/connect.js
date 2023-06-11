// require('dotenv').config();


// const admin = require('firebase-admin');
import admin from "firebase-admin";

// const serviceAccount = require('../serviceAccountKey.json');
// const serviceAccount = process.env.serviceAccountKey;
// import serviceAccount from '../serviceAccountKey.json' assert {type:'json'};

const serviceAccount = {
  "type": "service_account",
  "project_id": "code-to-give-breads",
  "private_key_id": "daf47cbf66b55b521c56df790222e38d4df082e1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDO+LvI3E2jEWL9\nqY1yb6mXzgJ4q0QVMtgBFacZ23HUNwJLupabWoxzRcWnOl/WdU//jN6Krl+kPkOm\ngvrHluCmvpSFbLAk4niw40TrBEkA+jX3L6487ZJF6+ZrZA/gJfyZOx17hZVV9YXv\n/RppvvFEWOD1eoVVr0cbSwgPKR8Gfzz/UYFeC961mfBGiFFRlPx1alCtFCjOUqdt\n/rKkao+Q0KBc/bMqFFtp6qkcFMLsmG04wzsK5/lQLkEFD+N75pby4C9gmCQ3zX0s\nmj3M6CR3qu84XUhC2n5fQXHWfGI7lccX21sKsTUUdGPNt96jr/f+amUWNwjfz6pc\nf/v4gl1FAgMBAAECggEAF5Rx/HvQ4ouoDgNDqK59EVz4nhvRCWM+Bb2cSI9eRBGy\nUsNixjdGOhnQX3GAmrPJ1fEMJ5ufLNylI3LXtGaFmKmszRipZsJggrKZ1vaphJF9\nFXjarnlYiVvLaB/ByUU6ppB8FucMsPrkdAePe020OhewJXd8elsaTEs7k1KZhMlE\nya9W3ZHzeyzyLcIY8fa/gZWTqgoISqYyCijMaHndIqBoBPrZfyGGASE5hZuAJWBu\noNUjw8BFs8HnEIOloamIys29HSFuZLh7VaIn6fC+d2tgLQxFsBCN+psHMN7PZa0Q\n3waqvBQxVuaUyGUSh5bbDTyCFjsvOdIvuPmCJPagnwKBgQDqqHbxswvooAD5QjTw\nmsDJTt21vwMFje2Rih+aQK06l8EKA4CAMifGF+Fb6ZKbs1L/p1jWosEENzADfuOS\nSXJrkk7YR8b9Dv3TO8tOtc39s0QratWqPo0l1vXv+NJ2Hm4u3WGEUmMqBJMfo5BM\nKFQnzx0/ewMG7kqNlopuYASPLwKBgQDhy6VzIKkCTZtjGRgFWxJYVwtsH/s3oO3L\n3t8GPh40XeVgKedm+1FdHqIPTH8twm58Y0qFBFwwU5XK7KXtI3cES9LHX1wh5Cgj\nYSGUc1yVrahiyrhUi+WX7DA44/1VB+6+/HNMWTJXsGl2iEajafHuhnA6YCtv/Fch\n+rN2OvudywKBgQC/nrQKqWgnHUnOQedTNzwI55MbEBEanwyJ1Z3666fJ+hRT5gow\nJUTfea64zKLA7I3xYKmmFB/EHoDhyeNyGPILr90ctnhjO7PAo8pgywuciaA4SDSU\noiHG7aPFw42xkSXutS8ly9VYgYXWx01VM3WNUI8UwJH3Pe25c141xcjTVwKBgQDM\n3Jz3UKmm+kzCY7EkotWJKyik6HtgpHU8ZLDLFC8JaivDzSEzkU/oAfQdl1VIakEe\nQGQLPcJ64ktk+sMs3eGNF1JdK8sGwOAeAXGbI/PbpdzCDZWit+8OoO+7njdqH7Fg\nvOHLYp5Hazq0nb4hY+1qcbV/cWPXzgYsQS70VV2XcwKBgQCdRyoO9CRqNUGmmKht\nwKBpvoT/aTVGunMPnUDiYZD83JGLnR4lx2zr/AEkCpq71Bn29zBQaq9hr1OPJMSK\nKAJ3+Au6pOK6VX5LOAcL0fXaXfc/HiVxJlIpLis4+OD7N0PJ3fbt+e2evkzehI+6\nuCaommoPwxgBY//glrBnV0nG4w==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-bq4o8@code-to-give-breads.iam.gserviceaccount.com",
  "client_id": "102288006674659669215",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bq4o8%40code-to-give-breads.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// module.exports = db;
export default db;