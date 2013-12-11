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

(query "department")
;;(mgcoll/insert "department" {:_id "ztds" :name "昭通市地方税务局" :leader "leader"})
;;(mgcoll/insert "department" {:_id "ztsj" :name "昭通市地方税务局" :leader "leader"})
;;(mgcoll/insert "department" {:_id "ztzy" :name "昭通市地方税务局" :leader "leader"})

;; (mgcoll/insert "department" {:_id "ztwx" :name "威信县地方税务局" :leader "leader"})
;; (mgcoll/insert "department" {:_id "ztzx" :name "镇雄县地方税务局" :leader "leader"})
;; (mgcoll/insert "department" {:_id "ztyl" :name "彝良县地方税务局" :leader "leader"})
;; (mgcoll/insert "department" {:_id "ztdg" :name "大关县地方税务局" :leader "leader"})
;; (mgcoll/insert "department" {:_id "ztyj" :name "盐津县地方税务局" :leader "leader"})
;; (mgcoll/insert "department" {:_id "ztsf" :name "水富县地方税务局" :leader "leader"})
;; (mgcoll/insert "department" {:_id "ztqj" :name "巧家县地方税务局" :leader "leader"})
;; (mgcoll/insert "department" {:_id "ztld" :name "鲁甸县地方税务局" :leader "leader"})
;; (mgcoll/insert "department" {:_id "ztys" :name "永善县地方税务局" :leader "leader"})
;; (mgcoll/insert "department" {:_id "ztsjx" :name "绥江县地方税务局" :leader "leader"})

;;(mgcoll/insert "user" {:_id "ztds008" :password "1" :name "姓名" :contcat "2222088" :department "ztds"})
;;(mgcoll/insert "user" {:_id "ztzy008" :password "1" :name "姓名" :contcat "2222088" :department "ztzy"})
;; (mgcoll/insert "user" {:_id "ztwx008" :password "1" :name "姓名" :contcat "2222088" :department "ztwx"})
;; (mgcoll/insert "user" {:_id "ztzx008" :password "1" :name "姓名" :contcat "2222088" :department "ztzx"})
;; (mgcoll/insert "user" {:_id "ztyl008" :password "1" :name "姓名" :contcat "2222088" :department "ztyl"})
;; (mgcoll/insert "user" {:_id "ztdg008" :password "1" :name "姓名" :contcat "2222088" :department "ztdg"})
;; (mgcoll/insert "user" {:_id "ztyj008" :password "1" :name "姓名" :contcat "2222088" :department "ztyj"})
;; (mgcoll/insert "user" {:_id "ztsf008" :password "1" :name "姓名" :contcat "2222088" :department "ztsf"})
;; (mgcoll/insert "user" {:_id "ztqj008" :password "1" :name "姓名" :contcat "2222088" :department "ztqj"})
;; (mgcoll/insert "user" {:_id "ztld008" :password "1" :name "姓名" :contcat "2222088" :department "ztld"})
;; (mgcoll/insert "user" {:_id "ztys008" :password "1" :name "姓名" :contcat "2222088" :department "ztys"})
;; (mgcoll/insert "user" {:_id "ztsjx008" :password "1" :name "姓名" :contcat "2222088" :department "ztsjx"})
