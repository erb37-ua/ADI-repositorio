/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // remove field
  collection.fields.removeById("text3787343564")

  // remove field
  collection.fields.removeById("text3249800787")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "json3787343564",
    "maxSize": 0,
    "name": "ingredientes",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "json3249800787",
    "maxSize": 0,
    "name": "pasos",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3787343564",
    "max": 0,
    "min": 0,
    "name": "ingredientes",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3249800787",
    "max": 0,
    "min": 0,
    "name": "pasos",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("json3787343564")

  // remove field
  collection.fields.removeById("json3249800787")

  return app.save(collection)
})
