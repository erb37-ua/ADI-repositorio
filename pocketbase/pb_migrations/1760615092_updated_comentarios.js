/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2200343395")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2127977590",
    "hidden": false,
    "id": "relation1425560568",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "receta_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2200343395")

  // remove field
  collection.fields.removeById("relation1425560568")

  return app.save(collection)
})
