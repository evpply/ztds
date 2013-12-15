(defproject resource "0.1.0-SNAPSHOT"
  :description " "
  :url ""
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [compojure "1.1.6"]
                 [liberator "0.10.0"]
                 [com.novemberain/monger "1.7.0-beta1"]
                 [ring/ring-json "0.2.0"]
                 [ring-basic-authentication "1.0.2"]
                 [clj-time "0.6.0"]
                 [org.clojure/data.codec "0.1.0"]
                 [org.clojure/algo.generic "0.1.1"]
                 [dk.ative/docjure "1.6.0"]
                 [javax.servlet/servlet-api "2.5"]
                 ]
  :plugins [[lein-ring "0.8.8"]]
  :ring {:handler ztds.server/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
