(ns ztds.server

  (:use [ztds.resources :only [assemble-routes]]
        [ztds.entity.user :as user]
        [ring.middleware.basic-authentication])
  (:require [ring.middleware.json :as middleware]))

(def app
  (-> (assemble-routes)
      (middleware/wrap-json-body)
      (middleware/wrap-json-response)
      (wrap-basic-authentication user/authenticated?)
      ))
