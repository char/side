rm -rf docs/build/*
(cd docs/ && make)
cp -r lib/ docs/build/x
