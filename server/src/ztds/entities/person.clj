(ns ztds.entity.person
  (:use [clojure.walk :only [keywordize-keys]]
        [dk.ative.docjure.spreadsheet]
        [clojure.set :only [rename-keys]]
        [clojure.java.io :only [file reader]]
        [clojure.algo.generic.functor :only [fmap]])
  (:require [ztds.db :as db]
            [ztds.entity.department :as department]
            [clj-time.core :as time :only [today]]))


(defn schema []
  [
   {:field "id" :displayName "编号" :type "text"}
   {:field "name" :displayName "姓名" :type "text"}
   {:field "sex" :displayName "性别" :type "sex"}
   {:field "party" :displayName "政治面貌" :type "party"}
   {:field "age" :displayName "年龄" :type "number"}
   {:field "contact" :displayName "联系方式" :type "text"}
   {:field "address" :displayName "住址" :type "text"}

   {:field "org" :displayName "工作单位" :type "text"}
   {:field "post" :displayName "职务" :type "text"}
   ])

(defn create-or-update []
  (fn [ctx]
    (let [data (keywordize-keys (get-in ctx [:request :body]))
          doc (assoc {}
                :_id "data"
                :submitDate (str (time/today))
                :data data)]
      (db/upsert "person" doc))))

(defn query [id]
 (if (nil? id)
   (-> (db/query-one "person" "data") :data)
   (db/query-one "person" "data")))
