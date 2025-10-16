/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2200343395")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number1832771828",
    "max": 5,
    "min": 1,
    "name": "valoracion",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2200343395")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number1832771828",
    "max": 5,
    "min": 1,
    "name": "valoracion",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
