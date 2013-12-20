(ns ztds.resources
  (:use [liberator.core :only [defresource resource]]
        [compojure.core :only [ANY routes]])
  (:require [ztds.entities.user :as user]))

(defn- fun-call [ns fn]
  (@(resolve (namespace 'ztds.resources) (symbol ns fn))))

(defn- get-entity-schema [entity]
  (fun-call (str "ztds.entity" "." entity) "schema"))

(defn- z-defresource
  "args: handlers -> {:get foo :post bar ...}"
  [handlers]
  (resource
   :allowed-methods (-> handlers keys vec)
   :available-charsets ["utf-8"]
   :available-media-types ["application/json"]
   :handle-ok (handlers :get)
   :post! (handlers :post)
   :handle-created (handlers :post)
   :put! (handlers :put)
   :delete! (handlers :delete)))

(defn login []
  (z-defresource {:post (user/login) :get "login ok"}))

;; (defn schema [entity]
;;   (z-defresource {:get (get-entity-schema entity)}))

(defn assemble-routes []
  (->
   (routes
    (ANY "/login" [] (login))
    )))
