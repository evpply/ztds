(ns ztds.entity.department
  (:use [ztds.db :as db]))

(defn name [id]
  (:name (db/query-one "department" id)))
