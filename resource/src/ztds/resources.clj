(ns ztds.resources
  (:use [liberator.core :only [defresource]]
        [compojure.core :only [context ANY routes defroutes]])
  (:require [ztds.the8 :as the8]
            [ztds.user :as user]
            [ztds.entity.the8 :as the8-entity]))

(defresource the8-entity-definition []
  :allowed-methods [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["application/json"]
  :handle-ok (the8-entity/definition))

(defresource the8 [id]
  :allowed-methods [:post :get :delete :put]
  :available-charsets ["utf-8"]
  :available-media-types ["application/json"]
  :handle-ok (the8/query id)
  :post! (the8/create))

(defresource the8-export [id ]
  :allowd-method [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["application/vnd.ms-excel"]
  :handle-ok (the8/export id))

(defresource department []
  :allowed-methods [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["text/plain"]
  :handle-ok (user/department))

(defn assemble-routes []
  (->
   (routes
    (ANY "/department/x" [] (department))
    (ANY "/the8-entity-definition" [] (the8-entity-definition))
    (ANY "/the8" [] (the8 nil))
    (ANY "/the8/:id" [id] (the8 id)))))
