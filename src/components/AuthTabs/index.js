import React from 'react';
import './style.css';

import AuthForm from '../AuthForm';
import RegisterForm from '../RegisterForm';


class AuthTabs extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			tabs: [
				{
					id: 'auth',
					name: 'Авторизация'
				},
				{
					id: 'register',
					name: 'Регистрация'
				}
			],
			activeTab: 'auth'
		};
	}

	changeActiveTab = tabId => {
		this.setState({activeTab: tabId});
	};

	render(){
		const tabLinks = this.state.tabs.map((tab, tabIndex) => {
			let itemClass = ['nav-link', tab.id === this.state.activeTab ? 'active': ''].join(' ');
			return (
				<li className="nav-item" key={tab.id} onClick={this.changeActiveTab.bind(this, tab.id)}>
					<a className={itemClass} href="#0">{tab.name}</a>
				</li>
			);
		});
		return (
			<div className="auth-tabs-container">
				<div className="auth-tabs">
					<header className="auth-tabs__header">
						<ul className="nav nav-pills nav-fill">
							{tabLinks}
						</ul>
					</header>

					<main className="auth-tabs__body">
						{ this.state.activeTab === 'auth' ? <AuthForm /> : null}
						{ this.state.activeTab === 'register' ? <RegisterForm /> : null}
					</main>
				</div>
			</div>
		)
	}
}
export default AuthTabs;
