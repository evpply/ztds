(ns ztds.entity.pj
  (:use [clojure.walk :only [keywordize-keys]]
        [dk.ative.docjure.spreadsheet]
        [clojure.set :only [rename-keys]]
        [clojure.java.io :only [file reader]]
        [clojure.algo.generic.functor :only [fmap]])
  (:require [ztds.db :as db]
            [ztds.entity.department :as department]
            [clj-time.core :as time :only [today]]))

(defn create []
  nil)

(defn query [id]
  (if (nil? id) (db/query-1 "pj")))
