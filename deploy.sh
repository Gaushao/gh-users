rm -r build
yarn build
yarn docs
cp -r coverage/lcov-report/. build/coverage
gh-pages -d build