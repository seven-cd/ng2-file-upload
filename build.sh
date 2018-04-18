# Remove previous build files
rm -rf dist

# Var pointing to NGC
TRANSPILE="npm run transpile"
PACKAGE="npm run package"

# Run Angular Compiler
$TRANSPILE
$PACKAGE

# Copy files
cp package.json dist/package.json

# Publish package
cd dist && npm publish