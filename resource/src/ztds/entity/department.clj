(ns ztds.entity.department
  (:use [ztds.db :as db]))

(defn dep-name [id]
  (:name (db/query-one "department" id)))
