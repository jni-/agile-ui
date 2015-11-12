import React from 'react';

const App = (props) => {
    return (
      <div>
        <div className="content">
          {props.children}
        </div>
      </div>
    );
};

export default App;
