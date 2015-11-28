ObjectStorage = (function() {

	function observer(callback, changes) {
		changes.forEach(function(change) {
			// console.debug('change', change);
			if (typeof change.object[change.name] == 'object') {
				if (change.type == 'add') {
					findAndObserveAll(change.object[change.name], callback);
				}
				else if (change.type == 'update') {
					findAndObserveAll(change.object[change.name], callback);
				}
			}
		});
		callback();
	}

	function observeOne(obj, callback) {
		Object.observe(obj, observer.bind(null, callback));
	}

	function findAndObserveAll(obj, callback) {
		observeOne(obj, callback);
		for (var x in obj) {
			if (obj.hasOwnProperty(x) && typeof obj[x] == 'object') {
				findAndObserveAll(obj[x], callback);
			}
		}
	}

	function ObjectStorage(storage, name) {
		var root = {};
		var set = true;
		if (storage[name] != null) {
			try {
				root = JSON.parse(storage[name]);
				set = false;
			}
			catch (ex) {}
		}
		if (set) {
			storage[name] = root;
		}
		findAndObserveAll(root, function() {
			storage[name] = JSON.stringify(root);
		});
		return root;
	}

	return ObjectStorage;

})();
