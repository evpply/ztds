(ns ztds.the8
  (:use [clojure.walk :only [keywordize-keys]]
        [dk.ative.docjure.spreadsheet]
        [clojure.java.io :only [file reader]])
  (:require [ztds.db :as db]
            [clj-time.core :as time :only [today]]))

(defn- my-write-cell [workbook cell value]
  )

(defn export []
  (let [workbook (load-workbook "resources/public/1.xls")
        a1 (-> workbook (.getSheetAt 0) (.getRow 5) (.getCell 7))]
    (do (set-cell! a1 "changed")
        (save-workbook! "resources/public/2.xls" workbook)
        (file "resources/public/2.xls"))))

(defn create []
  (fn [ctx]
    (let [resource (keywordize-keys (get-in ctx [:request :body]))
          dist (assoc resource
                 :submitDate (str (time/today))
                 :_id "01")]
      (db/upsert "the8" dist))))

(defn query [id]
  (if (nil? id)
    (db/query "the8")
    (let [data (db/query-one "the8" {:_id id})]
      (if (empty? data)
        (assoc {}
          :research []
          :outlay []
          :conferenceFile [])
        data))))
