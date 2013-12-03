(ns ztds.excel
  (:use [clojure.walk :only [keywordize-keys]]
        [dk.ative.docjure.spreadsheet]
        [clojure.java.io :only [file reader]])
  (:require [ztds.db :as db]
            [clj-time.core :as time :only [today]]))

(defn write-cells
"args:
  workbook:dk.ative.docjure.spreadsheet/workbook
  cells: {:sheet num :row num :cols vec}
  data: vec"
  [workbook cells data]
  (dorun
   (map
    #(set-cell!
      (-> workbook
          (.getSheetAt (:sheet cells))
          (.getRow (:row cells))
          (.getCell %1))
      %2)
    (:cols cells)
    data))
  workbook)

;; (save-workbook! "/home/wing/Workspace/export.xls"
;;                 (write-cells (load-workbook "/home/wing/Workspace/ztds/resource/resources/public/the8_template_ztsj.xls")
;;                              {:sheet 0 :row 5 :cols [1 2]} [111 2222]))
