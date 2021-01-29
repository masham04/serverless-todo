const React = require("react");
const netlifyIdentity = require("netlify-identity-widget");

const IdentityContext = React.createContext({});
exports.IdentityContext = IdentityContext;

const IdentityProvider = props => {
    const [user, setuser] = React.useState();
    React.useEffect(() => {
      netlifyIdentity.init({});
      netlifyIdentity.on("login", user => {
        netlifyIdentity.close()
        setuser(user)
      } )
      netlifyIdentity.on("logout", () => {
        netlifyIdentity.close()
        setuser()
      })
    });
    return(
        <IdentityContext.Provider value={{identity: netlifyIdentity,user}}>
            {props.children}
        </IdentityContext.Provider>
    )
}
exports.Provider = IdentityProvider;