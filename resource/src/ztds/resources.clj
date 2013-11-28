(ns ztds.resources
  (:use [liberator.core :only [defresource]]
        [compojure.core :only [context ANY routes defroutes]]
        [clojure.walk :only [keywordize-keys]]
        )
  (:require [ztds.the8 :as the8]))

(defresource the8 [id]
  :allowed-methods [:post :get :delete :put]
  :available-charsets ["utf-8"]
  :available-media-types ["application/json"]
  :handle-ok (the8/query id)
  :post! (the8/create))

(defresource the8-export []
  :allowd-method [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["application/vnd.ms-excel"]
  :handle-ok (the8/export))

(defn assemble-routes []
  (->
   (routes
    (ANY "/the8" [] (the8 nil))
    (ANY "/the8/:id" [id] (the8 id))
    (ANY "/the8-export" [] (the8-export)))))
