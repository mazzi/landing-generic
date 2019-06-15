# Landing
A responsive landing page to capture email leads and measure your market.

## Features
* **Free!** Heroku and MongoDB atlas trial accounts required
* **Responsive** Get leads from mobile, tablet, desktop
* **Customizable** Customize your project logos and images (you'll need some html/css knowledge).
* **Google analytics** To measure when your audience is visiting.

Saves email and a timestamp into a mongoDB collection. Extensible (if you know how to code) to capture information like name, phone, _whateveryouneed_.

## Requirements
* [Heroku](https://www.heroku.com/) - Free dyno for NodeJS deployment.
* [MongoDB Atlas](https://www.mongodb.com/) - Free trial account. With a database and a collection called `leads`
* Developed and tested on `"node": "10.3.0"`

## Usage

### Environment variables

| Variable | Description              | Default |
| -------- |:------------------------:| ------- | 
| PORT     | NodeJS port to listen to | 3000 |
| USERNAME | Username for the Mongodb cluster | undefined |
| PASSWORD | Password for the Mongodb cluster  | undefined |
| DATABASE | Database name inside MongoDB Cluster cluster | undefined |
| HOSTNAME | Database hostname | undefined |
| DEBUG_MONGOOSE | `true` if you want to debug requests | `false` |

### Development

`USERNAME="leads_user" PASSWORD="leads_password" DATABASE="leads_database" DEBUG_MONGOOSE=true npm start`

[http://localhost:3000](http://localhost:3000)


### Limitations

* Only `.svg` will be served.
* No independent `.css` files. Only inline styles on `index.html` file. 

Decissions based on security and simplicity.



