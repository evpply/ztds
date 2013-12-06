(ns ztds.util.excel
  (:use [dk.ative.docjure.spreadsheet]
        [clojure.java.io :only [file reader]])
  (:require [ztds.db :as db]
            [clj-time.core :as time :only [today]]))

;; (defn write-cells [workbook sheet cells data]
;;   (dorun
;;    (map
;;     #(set-cell!
;;       (-> workbook
;;           (.getSheetAt sheet)
;;           (.getRow  (first  (second %)))
;;           (.getCell (second (second %))))
;;       ((first %) data))
;;     (seq cells)))
;;   workbook)

;; (def cells {:department [2,1] :submitDate [2,3] :contactor [2,5] :contact [2,7] :leader [2,9]
;;             :times [5,1]})
;; (def data {:department "昭通市地方税务局" :submitDate "2013-12-04" :contactor "123"
;;            :contact "123456" :leader "leader" :times 20})
;; (def workbook (load-workbook "/home/wing/Workspace/ztds/resource/resources/public/the8_template_ztsj.xls"))

;; (save-workbook! "/home/wing/Workspace/export.xls"
;;                 (write-cells workbook 0 cells data))
