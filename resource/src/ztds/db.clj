(ns ztds.db
  (:use [monger.operators])
  (:require [monger.core :as mg]
            [monger.collection :as mgcoll]))

(mg/connect!)
(mg/set-db! (mg/get-db "ztds"))

(defn- get-next-seq [source]
  (mgcoll/find-and-modify "counters"
                          {:_id source}
                          {$inc {:seq 1}}
                          :upsert true))

(defn upsert [coll doc]
  (mgcoll/upsert coll {:_id (:_id doc)} doc))

(defn query-one [coll cond]
  (mgcoll/find-one-as-map coll cond))
(defn query [coll]
  (mgcoll/find-maps coll))
