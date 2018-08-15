// eslint-disable-next-line 
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
// eslint-disable-next-line 
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App />,
	// eslint-disable-next-line 
	document.getElementById('root')
);
registerServiceWorker();
