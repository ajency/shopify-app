/** Load env config */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const shopifyApiPublicKey = process.env.SHOPIFY_API_PUBLIC_KEY;
const shopifyApiSecretKey = process.env.SHOPIFY_API_SECRET_KEY;
const scopes = process.env.SHOPIFY_API_SCOPES;
const appUrl = process.env.SHOPIFY_URL;

/** Initialize Express */
/** Initialize Express */
const express = require("express");
const expressip = require('express-ip');
const cors = require('cors')
const axios = require('axios');
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const app = express();
app.use(cors())
app.use(express.json());
app.set('trust proxy', true);
app.use(expressip().getIpInfoMiddleware);

const buildRedirectUri = () => appUrl+'/shopify/callback';
const buildInstallUrl = (shop, state, redirectUri) => 'https://'+shop+'/admin/oauth/authorize?client_id='+shopifyApiPublicKey+'&scope='+scopes+'&state='+state+'&redirect_uri='+redirectUri;
const buildAccessTokenRequestUrl = (shop) => 'https://'+shop+'/admin/oauth/access_token';
const generateEncryptedHash = (params) => crypto.createHmac('sha256', shopifyApiSecretKey).update(params).digest('hex');

const fetchAccessToken = async (shop, data) => await axios(buildAccessTokenRequestUrl(shop), {
  method: 'POST',
  data
});

const authService = require("./services/v1/authService");

app.get('/shopify', (req, res) => {
    const shop = req.query.shop;
    const session = req.query.session;
  	if (!shop) { return res.status(400).send('no shop')}
  	if(!session){
  		const state = nonce();
		const installShopUrl = buildInstallUrl(shop, state, buildRedirectUri())
		res.cookie('state', state) // should be encrypted in production
		res.redirect(installShopUrl);
  	}
  	else{
  		res.redirect(appUrl);
  	}
});

app.get('/shopify/callback', async (req, res) => {
  	const { shop, code, state } = req.query;
  	const stateCookie = cookie.parse(req.headers.cookie).state;

  	if (state !== stateCookie) { return res.status(403).send('Cannot be verified')}

  	const { hmac, ...params } = req.query
  	const queryParams = querystring.stringify(params)
  	const hash = generateEncryptedHash(queryParams)

  	if (hash !== hmac) { return res.status(400).send('HMAC validation failed')}

  	try {
	    const data = {
	      client_id: shopifyApiPublicKey,
	      client_secret: shopifyApiSecretKey,
	      code
	    };
	    const tokenResponse = await fetchAccessToken(shop, data)

	    const { access_token } = tokenResponse.data

	    //store token for the shop
	    let storePayload = {
                name:shop,
                email: '',
                access_token:access_token
            }
	    await authService.createStoreToken(storePayload);
	    let shopAppurl = 'https://'+shop+'/admin/apps/'+(process.env.SHOPIFY_APP_NAME).toLowerCase()
	    res.redirect(shopAppurl);

  	} catch(err) {
	    console.log(err)
	    res.status(500).send('something went wrong')
  	}

});

 

 /** Routes */
// app.use('/views', express.static('views'));
app.use("/api", require("./api"));
app.get('/', function(req, res, next) {
   const session = req.query.session;
   let options = {
   		site_url : appUrl
   }
  // if (!session) { return res.status(400).send('<h1>Access Denied :(</h1>')}	
   res.sendFile(path.join(__dirname + '/views/home.html'),options);
});



//define js files
app.get('/assets/js/scripts.js', function(req, res, next) {
   res.sendFile(path.join(__dirname + '/assets/js/scripts.js'));
});

app.get('/assets/js/wishlist-app.js', function(req, res, next) {
   res.sendFile(path.join(__dirname + '/assets/js/wishlist-app.js'));
});

app.get('/assets/js/orders-app.js', function(req, res, next) {
   res.sendFile(path.join(__dirname + '/assets/js/orders-app.js'));
});

app.use((req, res) => {
	res.status(404).send("ERR: 404");
});

app.listen(process.env.PORT);
console.log("Listening on port " + process.env.PORT + "...");

