(ns ztds.entity.user
  (:use [ztds.db :as db]
        [clojure.data.codec.base64 :as base64]
        [clojure.string :only [trim split]]))

(defn- byte-transform
  [direction-fn string]
  (try
    (reduce str (map char (direction-fn (.getBytes string))))
    (catch Exception _)))

(defn- decode-base64
  [^String string]
  (byte-transform base64/decode string))

(defn- encode-base64
  [^String string]
  (byte-transform base64/encode string))

(defn- query-user [user]
  (let [user (db/query-one "user" user)
        department (db/query-one "department" (user :department))]
    (assoc {}
      :name (user :name)
      :departmentName (department :name)
      :department (department :_id))))


(defn current []
  (fn [ctx]
    (let [auth (get (get-in ctx [:request :headers]) "authorization")]
     (query-user
      (first
       (split (decode-base64
               (trim
                (re-find #"\s.*" auth))) #":"))))))

;; (defn authenticated? [name pass]
;;   (not (nil? (db/query "user" {:_id name :password pass}))))

(defn authenticated? [name pass]
  (not (empty?  (db/query "user" {:_id name :password pass}))))
