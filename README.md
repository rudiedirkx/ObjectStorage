ObjectStorage
===

ObjectStorage wraps a magic Storage object (i.e. `localStorage` and `sessionStorage`) to make
it accessible and writable like a normal objects. Meaning it can contain objects and arrays and
scalars, and it will be stored in the parent storage object (i.e. `localStorage`).

There are 2 ways of wrapping Storage data:

Per property
---

	var prop = ObjectStorage(localStorage, 'prop');
	prop.data = 'data';
	prop.more = {data: 'is possible'};
	prop.there = ['limit', 'on' nesting'];
	prop.there[0] = 'NO LIMIT';
	console.log(localStorage.prop); // JSON for `prop`

This is very verbose if you need several properties.

Copying part of Storage
---

	var storage = ObjectStorage(localStorage, ['prop', 'more', 'props']);
	storage.prop.data = 'data';
	storage.more.data = {more; 'data'};
	storage.props.type = 'object';

Only mentioned properties will exist in `storage` and making new ones won't work. **Every property
will be an object.** It can contain arrays, but can't be an array itself (yet: #2).
