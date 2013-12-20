(ns ztds.entities.user
  (:require [ztds.db :as db]))

(defn login []
  (fn [ctx] {:id "ztsj008" :name "姓名" :org "昭通市地方税务局" }))

;; (defn authenticated? [username password]
;;   (not (empty?  (db/query "user" {:_id username :password password}))))

(defn authenticated? [username password]
  (and (= username "ztsj008") (= password "1")))
