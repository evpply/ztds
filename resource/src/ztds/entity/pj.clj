(ns ztds.entity.pj
  (:use [clojure.walk :only [keywordize-keys]]
        [dk.ative.docjure.spreadsheet]
        [clojure.set :only [rename-keys]]
        [clojure.java.io :only [file reader]]
        [clojure.algo.generic.functor :only [fmap]])
  (:require [ztds.db :as db]
            [ztds.entity.department :as department]
            [clj-time.core :as time :only [today]]))

;; (def a (->> (load-workbook "/home/wing/Workspace/post.xls")
;;         (select-sheet "Sheet1")
;;         (select-columns {:A :department :B :post :C :pj})))
;; (db/upsert "pj" {:_id "ztsj" :pj a})

(defn create []
  nil)

(defn query [id]
  (if (nil? id)
    (reduce concat (map #(:pj %) (db/query "pj")))
    (db/query "pj" {:_id id})))

(db/query "pj")
(query nil)

(defn query [id]
  (if (nil? id)
    (let [record (db/query "pj")]
      (reduce
       concat
       (map #(map (fn [x]
                    (into x { :org (department/dep-name (:_id %))}))
                  (:pj %))
            record)))
    (db/query "pj" {:_id id})
    ))
