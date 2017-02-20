#!/bin/bash

# copying templates defined in users, to our dependend-on emails extra
cp -r templates/* ../emails/templates

npm install nosqldb underscore randomatic hash.js uuid --save
