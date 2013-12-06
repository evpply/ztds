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

(defn- query-department [user]
 (:department (db/query-one "user" user)))

(defn department []
  (fn [ctx]
    (let [http-basic-authoriztion (get (get-in ctx [:request :headers]) "authorization")]
     (query-department
      (first
       (split (decode-base64
               (trim
                (re-find #"\s.*" http-basic-authoriztion)))
              #":"))))))

(defn authenticated? [name pass]
  (not (nil? (db/query "user" {:_id name :password pass}))))
