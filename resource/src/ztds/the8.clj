(ns ztds.the8
  (:use [clojure.walk :only [keywordize-keys]]
        [dk.ative.docjure.spreadsheet]
        [clojure.java.io :only [file reader]])
  (:require [ztds.db :as db]
            [ztds.excel :as excel]
            [clj-time.core :as time :only [today]]))






;; (defn export [id]
;;   (let [workbook (load-workbook "resources/public/1.xls")
;;         a1 (-> workbook (.getSheetAt 0) (.getRow 5) (.getCell 7))]
;;     (do (set-cell! a1 "changed")
;;         (save-workbook! "resources/public/2.xls" workbook)
;;         (file "resources/public/2.xls"))))

(defn report-date []
  (let [t (time/today)]
    (str (time/year t) "-" (- (time/month t) 1))))

(defn date-filter [x y]
  (filter #(= (:date %) x) y))

(defn query-data [id date]
  (let [record (db/query-one "the8" {:_id id})]
    (assoc {}
      :_id (:_id record)
      :submitDate (:submitDate record)
      :research (date-filter date (:research record))
      :outlay (date-filter date (:outlay record))
      :conferenceFile (date-filter date (:conferenceFile record)))))


(defn this-year-data [id]
  (let [data (query-data id (report-date))]
    (conj []
          (assoc {}
            :data (map (first (:research data))
                       [:times :nLeaders :nAccompanies :days :problems :problemsSolved :nReports])
            ;; :cols [1 3 4 5 6 7 8]
            ;; :sheet 0
            ;; :row 5
            ))))


(save-workbook! "/home/wing/Workspace/export.xls"
                (excel/write-cells (load-workbook "/home/wing/Workspace/ztds/resource/resources/public/the8_template_ztsj.xls")
                             {:sheet 0 :row 5 :cols [1 3 4 5 6 7 8]} (:data (first (this-year-data "ztsj")))))




(defn export [id]
  id)

(defn create []
  (fn [ctx]
    (let [resource (keywordize-keys (get-in ctx [:request :body]))
          dist (assoc resource
                 :submitDate (str (time/today)))]
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
