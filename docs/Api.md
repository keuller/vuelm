# Vuelm API

This document describes the VuElm API.

### Vuelm.store(state, updates, stores)

This method create your store object that represents the state of application.

```javascript
	import { store } from 'vuelm'
	
	const state = { ... }
	
	const updates = { ... }
	
	const actions = { ... }
	
	export default store(state, updates, actions)
```

To enable logging to specific store, just change the **logger** property to true.

```javascript
	const mystore = store(state, updates, actions)
	mystore.logger = true

	export default mystore
```

### Vuelm.connect(component, models)

This function binds the Vue component with one or more models.

```javascript
	import { connect } from 'vuelm'
	import counter from 'models/counter'
	
	const Counter = {
		// component code goes here
	}
	
	export default connect(Counter, { counter })
```

The first argument is the Vue component and the second one, must be a literal object with all stores you wish to bind with. When you has more than one model bound to component, Vuelm merge all states of each model into a single one.

### Vuelm.types(...args)

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

### sync(data)

This method synchronizes ViewModel data to model. This method is added automatically into Vue component instance. You can see the use of this feature in *Financial* example.

```javascript
	this.sync(this.$data)
```
