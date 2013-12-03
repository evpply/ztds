(ns ztds.entity.the8)

(defn definition []
  {:fields
   {:research
    [{:field "date"            :displayName "月份"         :type "text"}
     {:field "times"           :displayName "调研次数"      :type "number"}
     {:field "leaders"         :displayName "带队领导（人）" :type "number"}
     {:field "accompanies"     :displayName "陪同人数"      :type "number"}
     {:field "duration"        :displayName "调研天数"      :type "number"}
     {:field "problems"        :displayName "发现问题（个）" :type "number"}
     {:field "problemsSolved"  :displayName "解决问题（个）" :type "number"}
     {:field "reports"         :displayName "调研报告（篇）" :type "number"}]

    :outlay
    [{:field "date"            :displayName "月份"      :type "text"}
     {:field "cars"            :displayName "公车费用"   :type "number"}
     {:field "accomPeoples"    :displayName "住宿：人次" :type "number"}
     {:field "accomCost"       :displayName "住宿：费用" :type "number"}
     {:field "dinnerPeoples"   :displayName "用餐：人次" :type "number"}
     {:field "dinnerCost"      :displayName "用餐：费用" :type "number"}
     {:field "officeExpenses"  :displayName "办公经费"   :type "number"}]

    :conference
    [{:field "date"             :displayName "月份"       :type "text"}
     {:field "normalConference" :displayName "会议：常规"  :type "number"}
     {:field "videlConference"  :displayName "会议：视频"  :type "number"}
     {:field "duration"         :displayName "会期（天）"  :type "number"}
     {:field "expenses"         :displayName "会议经费"    :type "number"}]

    :file
    [{:field "date"             :displayName "月份"       :type "text"}
     {:field "num"              :displayName "发文数"     :type "number"}
     {:field "length"           :displayName "篇幅"       :type "number"}
     {:field "newFiles"         :displayName "文件：新增"  :type "number"}
     {:field "abolishFiles"     :displayName "文件：废止"  :type "number"}]
    }})
