# Vuelm API

This document describes the Vuelm API.

### Vuelm.info()

This method prints out on browser's console the informations about Vuelm.

```javascript
	import Vuelm from 'vuelm'
	
	Vuelm.info()
```

The result will be:

![alt text](https://github.com/keuller/vuelm/raw/master/docs/images/vuelm_info.png)

### Vuelm.debug(true|false)

From version 0.2.0, this method enable/disable integration with Vue DevTools. Default value is **false**.

```javascript
	import Vuelm from 'vuelm'
	
	Vuelm.debug(true)
```

The result will be:

![alt text](https://github.com/keuller/vuelm/raw/master/docs/images/vuelm_debug.png)

*Notice: There is an issue when you click on Reset button, but it does not affect your code. Its occurs because Vuelm does not support the expected API. Vue DevTool was designed to Vuex.*

### Vuelm.logger(true|false)

From version 02.0, this method enable/disable console log of updates.

![alt text](https://github.com/keuller/vuelm/raw/master/docs/images/vuelm_log.png)

### model(state, updates, actions)

This function create model objects that represents the state of application.

```javascript
	import { model } from 'vuelm'
	
	const state = { ... }
	
	const updates = { ... }
	
	const actions = { ... }
	
	export default model(state, updates, actions)
```

### connect(component, models)

This function binds the Vue component with one or more models.

```javascript
	import { connect } from 'vuelm'
	import counter from 'models/counter'
	
	const Counter = {
		// component code goes here
	}
	
	export default connect(Counter, { counter })
```

The first argument is the Vue component object and the second one, must be a literal object with all models you wish to bind with. When you has more than one model bound to component, Vuelm merge all states of each model into a single one.

### types(...args)

This function create a literal object that will be used as update type. You must pass a list of strings constants.

```javascript
	import { types } from 'vuelm'
	
	const Types = types('INCREMENT', 'DECREMENT')
	
	// you can use it as constant types
	const actions = {
		increment() {
			this.update(Types.INCREMENT)
		}
	}
```

### update(type, data)

This method is used to send an update to model, specifying the update type and some data (optional).

```javascript
	const actions = {
		addTask(task) {
			this.update(Types.ADD_TASK, task)
		}
	}
```
