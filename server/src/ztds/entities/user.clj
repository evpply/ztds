(ns ztds.entities.user
  (:use [clojure.set :as set])
  (:require [ztds.db :as db]
            [clojure.walk :as walk]))

(defn login []
  (fn [ctx] {:id "ztsj008" :name "姓名" :org "昭通市地方税务局" }))

;; (defn authenticated? [username password]
;;   (not (empty?  (db/query "user" {:_id username :password password}))))

(defn authenticated? [username password]
  (and (= username "ztsj008") (= password "1")))

(def authority
  [{:id "ztsj" :allow ["001"]}
   {:id "ztsj.jcs" :group ["ztsj"] :allow ["000" "001"]}
   {:id "ztsj008" :group ["ztsj.jcs"] :allow ["001" "010"]}
   {:id "ztsj007" :group ["ztsj.jcs"]}
   {:id "ztsj001" :group ["ztsj"] :deny ["001"]}
   ])

;;operations : 0 -> get, 1 -> post, 2 -> put, 3 -> delete
(defn resources []
  [{:id "01" :resource "/indexes"}
   {:id "00" :resource "/login"}])

(defn get-authorities-iter [id authority-list]
  (let [record (first (filter #(= (% :id) id) authority-list))
        group (first (:group record))]
    (if (nil? group)
      (:allow record)
      (concat (:allow record) (get-authorities-iter group authority-list)))))

(defn- split-resource [code]
  (let [uri-code (subs code 0 2)
        method-code (subs code 2 3)
        uri (-> (filter #(= (% :id) uri-code) (resources))
                first
                :resource)
        method (cond
                (= "0" method-code) "get"
                (= "1" method-code) "post"
                (= "2" method-code) "put"
                (= "3" method-code) "delete"
                )]
    {:resource uri :operation method}
    ))

(defn get-authorities [user]
  (let [auth (into #{} (get-authorities-iter user authority))]
    (map split-resource auth)))


(defn- r [request method resources]
  (let [resource (:id (first (filter #(= (:resource %) request) resources)))
        operation (cond
                   (= "get" method) "0"
                   (= "post" method) "1"
                   (= "put" method) "2"
                   (= "delete" method) "3"
                   )]
    (str resource operation)))


(defn- f [id request authority-list]
  (let [record (first (filter #(= (% :id) id) authority-list))
        group (first (:group record))
        allow (some #{request} (:allow record))
        deny (some #{request} (:deny record))
        auth (cond
              (nil? (or allow deny)) nil
              (-> deny nil? not) false
              (-> allow nil? not) true)]
    (cond
     (nil? record) false
     (nil? (or auth group)) false
     (nil? auth) (f group  request authority-list)
     :else auth
     )))


(defn authorized? [user resource method]
  (let [r (r resource method (resources))]
    (f user r authority)))
