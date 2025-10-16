/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select1309676077",
    "maxSelect": 5,
    "name": "categoria",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Desayuno",
      "Comida",
      "Cena",
      "Salado",
      "Dulce"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select1309676077",
    "maxSelect": 1,
    "name": "categoria",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Desayuno",
      "Comida",
      "Cena",
      "Salado",
      "Dulce"
    ]
  }))

  return app.save(collection)
})
