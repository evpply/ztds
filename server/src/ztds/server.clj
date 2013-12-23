(ns ztds.server
  (:use [clojure.string :only [split]]
        [ring.middleware.json :as middleware]
        [ztds.resources :only [assemble-routes]]
        [clojure.data.codec.base64 :as base64])
  (:require [ztds.entities.user :as user]))

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
             [user pass] (and cred (split (str cred) #":"))]
         (if-let [token (and cred (authenticate (str user) (str pass)))]
           (app (assoc req :basic-authentication token))
           (merge {:headers {"Content-Type" "text/plain"}
                   :status 401
                   }
                  denied-response)
             )))))

(defn wrap-rest-authorization [app authorize]
     (fn [req]
       (let [uri (:uri req)
             method (:request-method req)
             auth ((:headers req) "authorization")
             cred (and auth (decode-base64 (last (re-find #"^Basic (.*)$" auth))))
             user (and cred  (re-find #"\w+(?=:)" (str cred)))]

         (if (and cred (authorize (str user) (str uri) (name method)))
           (app req)
           {:headers {"Content-Type" "text/plain"}
            :status 403
            })
         )))

(def app
  (-> (assemble-routes)
      (middleware/wrap-json-body)
      (middleware/wrap-json-response)
;;      (wrap-rest-authorization user/authorized?)
;;      (wrap-basic-authentication user/authenticated?)
      ))
