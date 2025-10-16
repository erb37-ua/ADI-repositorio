/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2200343395")

  // add field
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

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1267853058",
    "max": 0,
    "min": 0,
    "name": "comentario",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2200343395")

  // remove field
  collection.fields.removeById("number1832771828")

  // remove field
  collection.fields.removeById("text1267853058")

  return app.save(collection)
})
