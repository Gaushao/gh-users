rm -r build
yarn build
cp -r coverage/lcov-report/. build/coverage
gh-pages -d build