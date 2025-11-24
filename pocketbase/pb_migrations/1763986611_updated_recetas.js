/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != null && @request.auth.email = \"fmpp3@alu.ua.es\"",
    "deleteRule": "@request.auth.id != null && @request.auth.email = \"fmpp3@alu.ua.es\"",
    "updateRule": "@request.auth.id != null && @request.auth.email = \"fmpp3@alu.ua.es\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2127977590")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "updateRule": ""
  }, collection)

  return app.save(collection)
})
