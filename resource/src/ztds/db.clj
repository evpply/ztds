(ns ztds.db
  (:use [monger.operators])
  (:require [monger.core :as mg]
            [monger.collection :as mgcoll]))

(mg/connect!)
(mg/set-db! (mg/get-db "ztds"))

;; (defn- get-next-seq [source]
;;   (mgcoll/find-and-modify "counters"
;;                           {:_id source}
;;                           {$inc {:seq 1}}
;;                           :upsert true))

(defn upsert [coll doc]
  (mgcoll/upsert coll {:_id (:_id doc)} doc))

(defn query-one [coll id]
  (mgcoll/find-map-by-id coll id))

(defn query
  ([coll] (mgcoll/find-maps coll))
  ([coll cond] (mgcoll/find-maps coll cond)))



;; (mgcoll/insert "department" {:_id "ztds" :name "昭通市地方税务局" :leader "姜林"})
;; (mgcoll/insert "department" {:_id "ztsj" :name "昭通市地方税务局" :leader "李明洪"})
;; (mgcoll/insert "user" {:_id "ztsj008" :password "1" :name "姓名" :contcat "2222088" :department "ztsj"})

;;(mgcoll/insert "user" {:_id "ztzy008" :password "1" :name "姓名" :contcat "2222088" :department "ztzy"})
