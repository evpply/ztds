(ns ztds.resources
  (:use [liberator.core :only [defresource]]
        [compojure.core :only [context ANY routes defroutes]])
  (:require [ztds.entity.user :as user]
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
  :handle-ok (the8-entity/query id)
  :post! (the8-entity/create))

(defresource the8-export [id]
  :allowd-method [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["application/vnd.ms-excel"]
  :handle-ok (the8-entity/export id))


(defresource the8-report []
  :allowd-method [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["application/json"]
  :handle-ok (the8-entity/chart-data))

(defresource department []
  :allowed-methods [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["text/plain"]
  :handle-ok (user/department))

(defn assemble-routes []
  (->
   (routes
    (ANY "/the8-xls/:id" [id] (the8-export id))
    (ANY "/query-department" [] (department))
    (ANY "/the8-entity-definition" [] (the8-entity-definition))
    (ANY "/the8" [] (the8 nil))
    (ANY "/the8/:id" [id] (the8 id))
    (ANY "/the8-report" [] (the8-report))
    )))
