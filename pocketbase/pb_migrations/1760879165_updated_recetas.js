/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "json3787343564",
    "maxSize": 0,
    "name": "ingredientes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json3249800787",
    "maxSize": 0,
    "name": "pasos",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "json3787343564",
    "maxSize": 0,
    "name": "ingredientes",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(5, new Field({
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
})
