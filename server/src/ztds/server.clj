(ns ztds.server
  (:use [ztds.resources :only [assemble-routes]]
        [ztds.entities.user :as user])
 (:require [ring.middleware.json :as middleware]
           [clojure.string :as s]
           [clojure.data.codec.base64 :as base64]))

(defn- byte-transform
  [direction-fn string]
  (try
    (reduce str (map char (direction-fn (.getBytes string))))
    (catch Exception _)))

(defn- encode-base64
  [^String string]
  (byte-transform base64/encode string))

(defn- decode-base64
  [^String string]
  (byte-transform base64/decode string))

(defn wrap-basic-authentication
  ([app authenticate]
     (wrap-basic-authentication app authenticate nil nil))
  ([app authenticate realm]
     (wrap-basic-authentication app authenticate realm nil))
  ([app authenticate realm denied-response]
     (fn [req]
       (let [auth ((:headers req) "authorization")
             cred (and auth (decode-base64 (last (re-find #"^Basic (.*)$" auth))))
             [user pass] (and cred (s/split (str cred) #":"))]
         (if-let [token (and cred (authenticate (str user) (str pass)))]
           (app (assoc req :basic-authentication token))
           (merge {:headers {"Content-Type" "text/plain"}
                   :status 401
                  ;; :body "access denied"
                   }
                  denied-response)
             )))))

(def app
  (-> (assemble-routes)
      (middleware/wrap-json-body)
      (middleware/wrap-json-response)
      (wrap-basic-authentication user/authenticated?)
      ))
