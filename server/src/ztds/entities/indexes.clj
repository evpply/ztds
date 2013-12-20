(ns ztds.entity.indexes
  (:use [clojure.walk :only [keywordize-keys]]
        [dk.ative.docjure.spreadsheet]
        [clojure.set :only [rename-keys]]
        [clojure.java.io :only [file reader]]
        [clojure.algo.generic.functor :only [fmap]])
  (:require [ztds.db :as db]
            [ztds.entity.department :as department]
            [clj-time.core :as time :only [today]]))

(defn schema []
  [{:field "dateMonth"                    :displayName "月份"              :type "dateMonth"}
   {:field "investigationTimes"           :displayName "调研次数"           :type "number"}
   {:field "investigationDuration"        :displayName "调研天数"           :type "number"}
   {:field "carsExpenses"                 :displayName "公车运维费用"        :type "number"}
   {:field "officialReceptionExpenses"    :displayName "公务接待费"         :type "number"}
   {:field "officeExpenses"               :displayName "办公经费"           :type "number"}
   {:field "conferenceExpenses"           :displayName "会议经费"           :type "number"}
   {:field "conferenceTimes"              :displayName "会议次数"          :type "number"}
   {:field "dispatchFiles"                :displayName "发文数"             :type "number"}])

(defn create-or-update []
  (fn [ctx]
    (let [data (keywordize-keys (get-in ctx [:request :body]))
          doc (assoc data
                :submitDate (str (time/today)))]
      (db/upsert "indexes" doc))))

(defn query [id]
  (if (nil? id)
    (db/query "indexes")
    (db/query-one "indexes" id)))
