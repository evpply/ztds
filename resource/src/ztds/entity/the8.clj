(ns ztds.entity.the8
  (:use [clojure.walk :only [keywordize-keys]]
        [dk.ative.docjure.spreadsheet]
        [clojure.set :only [rename-keys]]
        [clojure.java.io :only [file reader]]
        [clojure.algo.generic.functor :only [fmap]])
  (:require [ztds.db :as db]
            [ztds.entity.department :as department]
            [clj-time.core :as time :only [today]]))

(defn schema []
  {
   :research
    [{:field "date"            :displayName "月份"         :type "date[yyyy-mm]"}
     {:field "times"           :displayName "调研次数"      :type "number"}
     {:field "leaders"         :displayName "带队领导（人）" :type "number"}
     {:field "accompanies"     :displayName "陪同人数"      :type "number"}
     {:field "duration"        :displayName "调研天数"      :type "number"}
     {:field "problems"        :displayName "发现问题（个）" :type "number"}
     {:field "problemsSolved"  :displayName "解决问题（个）" :type "number"}
     {:field "reports"         :displayName "调研报告（篇）" :type "number"}]

    :outlay
    [{:field "date"            :displayName "月份"      :type "date[yyyy-mm]"}
     {:field "cars"            :displayName "公车费用"   :type "number"}
     {:field "accomPeoples"    :displayName "住宿：人次" :type "number"}
     {:field "accomCost"       :displayName "住宿：费用" :type "number"}
     {:field "dinnerPeoples"   :displayName "用餐：人次" :type "number"}
     {:field "dinnerCost"      :displayName "用餐：费用" :type "number"}
     {:field "officeExpenses"  :displayName "办公经费"   :type "number"}]

    :conference
    [{:field "date"             :displayName "月份"       :type "date[yyyy-mm]"}
     {:field "normalConference" :displayName "会议：常规"  :type "number"}
     {:field "videoConference"  :displayName "会议：视频"  :type "number"}
     {:field "duration"         :displayName "会期（天）"  :type "number"}
     {:field "peoples"          :displayName "参会人数"    :type "number"}
     {:field "expenses"         :displayName "会议经费"    :type "number"}]

    :file
    [{:field "date"             :displayName "月份"       :type "date[yyyy-mm]"}
     {:field "num"              :displayName "发文数"     :type "number"}
     {:field "fLength"           :displayName "篇幅"       :type "number"}
     {:field "newFiles"         :displayName "文件：新增"  :type "number"}
     {:field "abolishFiles"     :displayName "文件：废止"  :type "number"}]
    })

;; (defn excel-view []
;;   {:research
;;    {:sheet 0
;;     :cells
;;     {:department      [2,1]
;;      :submitDate      [2,3]
;;      ;;:contactor       [2,5]
;;      ;;:contact         [2,7]
;;      :leader          [2,9]
;;      :times           [5,1]
;;      :leaders         [5,3]
;;      :accompanies     [5,4]
;;      :duration        [5,5]
;;      :problems        [5,6]
;;      :problemsSolved  [5,7]
;;      :reports         [5,8]}}
;;    :outlay
;;    {:sheet 1
;;     :cells
;;     { ;; :department      [2,1]
;;      ;; :submitDate      [2,3]
;;      ;; :contactor       [2,5]
;;      ;; :contact         [2,8]
;;      ;; :leader          [2,11]
;;      :cars            [6,7]
;;      :accomPeoples    [6,8]
;;      :accomCost       [6,9]
;;      :dinnerPeoples   [6,10]
;;      :dinnerCost      [6,11]
;;      :officeExpenses  [6,12]}}
;;    :conference
;;    {:sheet 2
;;     :cells
;;     { ;; :department      [2,1]
;;      ;; :submitDate      [2,3]
;;      ;; :contactor       [2,5]
;;      ;; :contact         [2,8]
;;      ;; :leader          [2,11]
;;      :normalConference [6,2]
;;      :videoConference  [6,3]
;;      :duration         [6,5]
;;      :peoples          [6,6]
;;      :expenses         [6,7]}}
;;    :file
;;    {:sheet 2
;;     :cells
;;     { ;; :department      [2,1]
;;      ;; :submitDate      [2,3]
;;      ;; :contactor       [2,5]
;;      ;; :contact         [2,8]
;;      ;; :leader          [2,11]
;;      :num              [6,8]
;;      :length           [6,9]
;;      :newFiles         [6,10]
;;      :abolishFiles     [6,11]}}
;;    })

;; (defn write-xls [workbook excel-view data]
;;   (dorun
;;    (map
;;     (fn [x]
;;       (dorun (map
;;               #(set-cell!
;;                 (-> workbook
;;                     (.getSheetAt (-> x second :sheet))
;;                     (.getRow (-> % second first))
;;                     (.getCell (-> % second second)))
;;                 (((first x) data) (first %))
;;                 )
;;               (-> x second :cells seq))))
;;     (seq excel-view)))
;;   workbook)

;; (defn string-max
;;   ([x] x)
;;   ([x y] (if (= 1 (compare x y)) x y))
;;   ([x y & more]
;;      (reduce string-max (string-max x y) more)))

;; (defn latest-month [record]
;;   (apply string-max (map #(:date %) (:outlay record))))

;; (defn date-filter [x y]
;;   (filter #(= (:date %) x) y))

;; (defn latest [id]
;;   (let [record (db/query-one "the8" id) date (latest-month record)]
;;     (assoc {}
;;       :submitDate (:submitDate record)
;;       :research (first (date-filter date (:research record)))
;;       :outlay (first (date-filter date (:outlay record)))
;;       :conference (first (date-filter date (:conference record)))
;;       :file (first (date-filter date (:file record)))
;;       )))

;; (defn xls-data [id]
;;   (let [t (db/query-one "department" id)
;;         data (latest id)
;;         dep (rename-keys (assoc t :submitDate (:submitDate data)) {:name :department})]
;;     (assoc data
;;       :research (merge dep (:research data)))
;;     ))

;; (defn export [id]
;;   (let [workbook (load-workbook "resources/public/the8_template_ztsj.xls")]
;;     (save-workbook! "resources/public/the8_export.xls"
;;                     (write-xls workbook
;;                                  (excel-view)
;;                                  (xls-data id)))
;;     (file "resources/public/the8_export.xls")))

(defn create []
  (fn [ctx]
    (let [data (keywordize-keys (get-in ctx [:request :body]))
          doc (assoc data
                ;;:_id (:id resource)
                :submitDate (str (time/today)))]
      (db/upsert "the8" doc))))

(defn- query-all-format [data]
  (reduce #(merge-with concat %1 %2)
            (map (fn [x]
                   (fmap (fn [y] (map #(into % {:department (department/dep-name (:_id x))}) y))
                         (select-keys x [:research :outlay :file :conference])))
                 data)))

(defn query [id]
  (if (nil? id)
    (let [data (db/query "the8")]
      (if (empty? data) nil
          (query-all-format (db/query "the8"))))
    (select-keys (db/query-one "the8" id) [:research :outlay :conference :file])))

;; (defn- chart-view-item [k]
;;   (map (fn [x] (reduce (fn [y z] (merge-with #(if (number? %1) (+ %1 %2) %1) y z)) x))
;;        (map #(second %) (seq (group-by :date (apply concat (map #(k %) (db/query "the8"))))))))

(defn- merge-1 [c]
  (fmap (fn [x] (reduce (fn [y z] (merge-with #(if (number? %1) (+ %1 %2) %1) y z)) x)) c))

(defn- chart-view-item [k]
  (map #(second %) (merge-1  (group-by :date (apply concat (map #(k %) (db/query "the8")))))))

(defn- chart-view-collect []
  (assoc {}
    :outlay (chart-view-item :outlay)
    :research (chart-view-item :research)
    :conference (chart-view-item :conference)
    :file (chart-view-item :file)))

(defn chart-view []
  (map #(assoc {}
          :date (:date %1)
          :outlay (+ (:cars %1) (:accomCost %1) (:dinnerCost %1) (:officeExpenses %1))
          :file (:num %2)
          :conference (+ (:normalConference %3) (:videoConference %3))
          )
       (:outlay (chart-view-collect))
       (:file (chart-view-collect))
       (:conference (chart-view-collect))
       ))
