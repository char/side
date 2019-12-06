rm -rf docs/build/*
(cd docs/ && make)
cp -r lib/ docs/build/x

(cd docs/build/ && git add -A . && git commit -m "[Auto] Deploy $(date)")
