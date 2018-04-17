# Remove previous build files
rm -rf dist
rm -rf build

# Create build folders
mkdir dist
mkdir build

# Var pointing to NGC
NGC="node node_modules/.bin/ngc"
#ROLLUP="node node_modules/.bin/rollup"

# Run Angular Compiler
$NGC -p src/tsconfig-build.json
#$ROLLUP -c

# Copy files
#rsync -a --exclude=*.js build/ dist
#cp src/package.json dist/package.json

# Publish package
#cd dist && npm publish