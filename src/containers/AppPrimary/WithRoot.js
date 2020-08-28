import React from 'react';


// A theme with custom primary and secondary color.
// It's optional.


function WithRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <div>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Component {...props} />
      </div>
    );
  }

  return WithRoot;    
}

export default WithRoot;
