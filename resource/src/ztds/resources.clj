(ns ztds.resources
  (:use [liberator.core :only [defresource]]
        [compojure.core :only [context ANY routes defroutes]])
  (:require [ztds.entity.user :as user]
            [ztds.entity.the8 :as the8]))

(defresource the8-schema []
  :allowed-methods [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["application/json"]
  :handle-ok (the8/schema))

(defresource the8-chart []
  :allowed-methods [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["application/json"]
  :handle-ok (the8/chart-view))

(defresource the8 [id]
  :allowed-methods [:post :get :delete :put]
  :available-charsets ["utf-8"]
  :available-media-types ["application/json"]
  :handle-ok (the8/query id)
  :post! (the8/create))

;; (defresource the8-export [id]
;;   :allowd-method [:get]
;;   :available-charsets ["utf-8"]
;;   :available-media-types ["application/vnd.ms-excel"]
;;   :handle-ok (the8-entity/export id))


;; (defresource the8-report []
;;   :allowd-method [:get]
;;   :available-charsets ["utf-8"]
;;   :available-media-types ["application/json"]
;;  :handle-ok (the8-entity/chart-data))

(defresource user []
  :allowed-methods [:get]
  :available-charsets ["utf-8"]
  :available-media-types ["application/json"]
  :handle-ok (user/current))

(defn assemble-routes []
  (->
   (routes
    (ANY "/current-user" [] (user))
    (ANY "/the8-schema" [] (the8-schema))
    (ANY "/the8" [] (the8 nil))
    (ANY "/the8/:id" [id] (the8 id))
    (ANY "/the8-chart" [] (the8-chart))
    )))
