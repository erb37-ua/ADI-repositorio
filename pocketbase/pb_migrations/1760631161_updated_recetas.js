/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // remove field
  collection.fields.removeById("relation2656945948")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2656945948",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "anadir_receta",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
