/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2200343395")

  // update collection data
  unmarshal({
    "name": "comentarios"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2200343395")

  // update collection data
  unmarshal({
    "name": "Comentarios"
  }, collection)

  return app.save(collection)
})
