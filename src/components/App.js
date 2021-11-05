import { contractsLoadedSelector } from '../store/selectors'
import { update } from '../store/interactions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Content from './Content'
import Navbar from './Navbar'
import './App.css'

class App extends Component {
	async componentDidMount() {
		await this.loadBlockchainData(this.props.dispatch)
	}

	async loadBlockchainData(dispatch) {
		/* Case 1, User connect for 1st time */
		if(typeof window.ethereum !== 'undefined'){
			await update(dispatch)

			/* Case 2 - User switch account */
			window.ethereum.on('accountsChanged', async (accounts) => {
				await update(dispatch)
			});

			/* Case 3 - User switch network */
			window.ethereum.on('chainChanged', async (chainId) => {
				await update(dispatch)
			});
		}
	}

	render() {
		return (
			<div className="text-monospace">
				<Navbar />
				{ this.props.contractsLoaded ? <Content /> : <div className="content"></div> }
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		contractsLoaded: contractsLoadedSelector(state)
	}
}

export default connect(mapStateToProps)(App)