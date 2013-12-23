'use strict';

var ztdsResourceBase  =  'http://localhost/resources/';

var ztds = {
    user: {},

    modules: ['mMain' ,'mIndexes'],

    resources: {
        indexes: ztdsResourceBase + 'indexes',
        login: ztdsResourceBase + 'login',
        authorities: ztdsResourceBase + 'authorities/ztsj008',
        schema: {
            indexes: ztdsResourceBase + 'schema/indexes'
        }
    },

    template: {
        mainPage: 'views/index.html',
        report :{
            indexes:{
                edit:'views/report/indexes/edit.html'
            }
        }
    },

    strTemplate: {
        input: {
            number: '<input type="number" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />',
            date: '<select ng-options="" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD"></select>',
            textarea: '<textarea style="height:105px" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ' +
                ' ng-input="COL_FIELD" ></textarea>',
            sex: '<select ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD"> ' +
                '<option>男</option>' +
                '<option>女</option>' +
                '</select>',
            party: '<select ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD"> ' +
                '<option>中共党员</option>' +
                '<option>其他</option>' +
                '</select>'
        },
        cell: '<div class="ngCellText"'+ 'ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD}}</span></div>',
        largeCell: '<div ng-class="col.colIndex()">'+ '<div style="word-wrap:break-word" ng-cell-text>{{COL_FIELD}}</div></div>'
    },

    navTree: [
        {
            label: '报表',
            children: [
                {url:'/report/indexes',
                 label: '八项规定',
                 authority: '/indexes'},

                {url:'/report/indexes',
                 label: 'test',
                 authority: '/test'}]
        }
    ]
};
