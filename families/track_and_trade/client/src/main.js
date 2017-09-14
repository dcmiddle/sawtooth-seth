/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */
'use strict'

// These requires inform webpack which styles to build
require('bootstrap')
require('../styles/main.scss')

const m = require('mithril')
const { signer } = require('sawtooth-sdk/client')

const AppState = require('./app_state')
const FishForm = require('./fish_form')
const LoginForm = require('./views/login_form')
const SignupForm = require('./views/signup_form')

AppState.signingKey = signer.makePrivateKey()

const Home = {
  view () {
    return m('.container', [
      m('h1', 'FishNet'),
      m('.page-list',
        m('h3', 'Pages'),
        m('ul',
          m('li',
            m('a[href="/create"]',
              { oncreate: m.route.link },
              'Create Fish')),
          m('li',
            m('a[href="/signup"]',
              { oncreate: m.route.link },
              'Signup Agent'))))
    ])
  }
}

document.addEventListener('DOMContentLoaded', () => {
  m.route(document.querySelector('#app'), '/', {
    '/': Home,
    '/create': {
      render: () => m(FishForm, {signingKey: AppState.signingKey})
    },
    '/signup': {
      render: () => m(SignupForm, AppState)
    }
  })
})
