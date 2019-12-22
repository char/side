rm -rf docs/build/*
(cd docs/ && make)
cp -r lib/. docs/build/

(cd docs/build/ && git add -A . && git commit -m "[Auto] Deploy $(date)" && git push)
