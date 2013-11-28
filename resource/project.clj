(defproject resource "0.1.0-SNAPSHOT"
  :description " "
  :url ""
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [compojure "1.1.6"]
                 [liberator "0.10.0"]
                 [com.novemberain/monger "1.7.0-beta1"]
                 [ring/ring-json "0.2.0"]
                 [clj-time "0.6.0"]
;;                 [incanter "1.5.4"]
                 [dk.ative/docjure "1.6.0"]
                 ]
  :plugins [[lein-ring "0.8.8"]]
  :ring {:handler ztds.server/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
