import { h, Component } from 'preact';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<header>
				<div class={style.header}>
					<img src="/assets/png/Mylo-Logo-decli-fond-transparent.png" />
					<p>Mylo</p>
				</div>
			</header>
		);
	}
}
