Make Fast & Visual Express Apps & APIs

# Apiworks

![npm monthly downloads](https://img.shields.io/npm/dm/apiworks.svg)
![github release](https://img.shields.io/github/release/haseebnqureshi/apiworks.svg)
![github license](https://img.shields.io/github/license/haseebnqureshi/apiworks.svg)

### Opinion
Apiworks is an opinionated wrapper around Express. Apiworks exposes key application events through the project's folder structure. This yields a few key benefits:
- Each discrete application part is confined to one file. This makes team collaboration cleaner and safer.
- Apiworks requires you to keep your data persistence layer separate from your application's abstraction of models and general business logic methods. This gives us the flexibility to easily swap out database drivers by writing our new dialect driver and passing ```DB_DIALECT``` in our ```.env``` file.
- Middlewares waterfall to sub routes. This makes authentication and restricted areas fast, and easy to code and visualize.
- Folders can be prefixed with an integer and underscore (i.e., ```3_```). This explicitly instructs Apiworks to waterfall your event handlers and middlewares in that specific order. For instance, ```0_lists``` will execute before ```1_lists``` and so forth. This is incredibly useful, and almost required, for multiple middlewares.

### Other Benefits
Here are some other benefits to how Apiworks is architected:
- If there are improvements to Apiworks, you can simply update your ```package.json``` without any further effort, as opposed to a REPL Express project tool that would merely generate an Express project. This way, you can quickly and safely absorb any Apiworks updates (and roll back if needed).
- Apiworks heavily leverages direct injected code design patterns. This allows Apiworks to be fast and lean, only instantiating what it needs and when necessary.
- We've designed a beautiful logging system that's baked into Apiworks. Apiworks logs any request that occurs on your application. It also marks the exact time and milliseconds, allowing for easy request duration calculations and examinations.

### Get Started in Seconds
In your project folder:

1. Install and save Apiworks into your project by ```npm install apiworks --save```
2. Copy and paste the contents of ```examples/basic``` from Apiworks into your project (including all invisible files)
3. Create a ```.env``` file in your project directory (reference ```index.js``` for more information)
4. Optional: if you're using Postgres, provide your connection information into your ```.env``` file. To ensure your schema, run ```npm run schema```
4. Run your project with ```npm start```!

### Purpose
Express is an amazing framework. There are an infinite ways in which an Express app can be organized and maintained, which is great. This is where Apiworks comes into play.
Apiworks allows us to create Express apps using folder structures. It helps us organize our data models, and separate them from our data peristence layer, baking best practices into even the smallest of Express applications.
It's our opinion that it's significantly easier to scan a directory, understand what pieces are into an app, and to then improve isolated parts of your application. This makes working in teams significantly better, and increases code maintainability.

### Disclaimer
Hey now, this is still in beta mode. As more time passes, it'll mature out of beta.

### Database Connections
In any implementation of ```lib``` inside any controllers found in your ```routes```, you will see the method ```connect```. This establishes a database connection, where a ```client``` is returned via callback. Your controller logic then passes that ```client``` object into any ```lib``` method, where then gets passed to whichever ```db``` methods that ```lib``` method calls. 

This seems confusing at first, but there's sound reasoning for exposing the database client that established the application connection, and that is preventing any extraneous opening and closing of database connections. When conducting multiple databse reads and writes, this allows the controller to explicitly control when the connection should end. 

For this reason, you'll see an extra parameter ```autoDrain``` follow the ```connect``` method's callback. By default, Apiworks auto drains your Postgres connections, erring on the side of caution with having too many database connections open. _So whenever you are running multiple database reads and writes, make sure you pass a ```false``` and explicitly call ```client.end()``` to prevent leaky database connections._

### Route File Templates
There are reserved types of files that live inside the application's ```routes``` directory. Here are some templates for each type of file. Please note, that they all look like Express, because Apiworks is an opininated boilerplate around Express!

#### __get.js, __post.js, __put.js, __delete.js
```
'use strict';

module.exports = function(db, lib, log) {

	return function(req, res) {

		return res.status(200).send({ message: 'Hello!' });

	};

};
```

#### _middleware.js
```
'use strict';

module.exports = function(db, lib, log) {

	return function(req, res, next) {

		next();

	};

};
```

#### __get.js to render .pug template
```
'use strict';

module.exports = function(db, lib, log) {

	return function(req, res) {

		var data = { 
			message: 'Hello'
		};

		var pugFilepath = __dirname + '/render.pug';

		return res.render(pugFilepath, data);

	};

};
```


Happy coding!
HQ
