const React = require('react') 
const { ThemeProvider } = require('theme-ui') 
const {deep} = require('@theme-ui/presets') 
const {Provider} = require("./identity-context")
const token = {
  ...deep,
  sizes: {container: 520}
}

module.exports = ({element}) => (
  <Provider>
<ThemeProvider theme={token}>{element}</ThemeProvider>
  </Provider>
  
)