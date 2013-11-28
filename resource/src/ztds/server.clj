(ns ztds.server
  (:use [ztds.resources :only [assemble-routes]] )
  (:require [ring.middleware.json :as middleware]))
(def app
  (-> (assemble-routes)
      (middleware/wrap-json-body)
      (middleware/wrap-json-response)))
