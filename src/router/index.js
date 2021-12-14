import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: function() {
            return import ('../views/Login.vue')
        }
    },
    {
        path: '/overall',
        name: 'Overall',
        component: function() {
            return import ('../views/Overall.vue')
        },
        redirect: '/homepage',
        children: [{
            path: '/homepage',
            name: 'HomePage',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/HomePage.vue')
            }
        }, {
            path: '/createtest',
            name: 'CreateTest',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/examination/administration/CreateTest.vue')
            }
        }, {
            path: '/showresults',
            name: 'ShowResults',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/examination/administration/ShowResults.vue')
            }
        }, {
            path: '/testlibrary',
            name: 'TestLibrary',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/examination/administration/TestLibrary.vue')
            }
        }, {
            path: '/testlist',
            name: 'TestList',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/examination/administration/TestList.vue')
            }
        }, {
            path: '/analysestudent',
            name: 'AnalyseStudent',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/examination/analyse/AnalyseStudent.vue')
            }
        }, {
            path: '/analysetest',
            name: 'AnalyseTest',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/examination/analyse/AnalyseTest.vue')
            }
        }, {
            path: '/connectionpublic',
            name: 'ConnectionPublic',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/examination/rests/ConnectionPublic.vue')
            }
        }, {
            path: '/custominterface',
            name: 'CustomInterface',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/examination/rests/CustomInterface.vue')
            }
        }, {
            path: '/addtitle',
            name: 'AddTitle',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/admintitle/AddTitle.vue')
            }
        }, {
            path: '/titlefeedback',
            name: 'TitleFeedback',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/admintitle/TitleFeedback.vue')
            }
        }, {
            path: '/titlelibrary',
            name: 'TitleLibrary',
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/admintitle/TitleLibrary.vue')
            }
        }, ]
    },
    {
        path: '/begindemo/:id',
        name: 'begindemo',
        component: function() {
            return import ('../views/begindemo.vue')
        }
    },
    {
        path: '/exam/:id',
        name: 'exam',
        component: function() {
            return import ('../views/exam.vue')
        }
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router