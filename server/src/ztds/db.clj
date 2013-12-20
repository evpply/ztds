(ns ztds.db
  (:use [monger.operators])
  (:require [monger.core :as mg]
            [monger.collection :as mgcoll]))

(mg/connect!)
(mg/set-db! (mg/get-db "ztds"))

(defn upsert [coll doc]
  (mgcoll/upsert coll {:_id (:_id doc)} doc))

(defn query-one [coll id]
  (mgcoll/find-map-by-id coll id))

(defn query
  ([coll] (mgcoll/find-maps coll))
  ([coll cond] (mgcoll/find-maps coll cond)))

(defn query-1
  ([coll] (map #(dissoc % :_id)  (mgcoll/find-maps coll)))
  ([coll cond] (map #(dissoc % :_id)  (mgcoll/find-maps coll))))
