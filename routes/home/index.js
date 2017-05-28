import { h, Component } from 'preact';
import style from './style';
import Tabs from '../../components/tabs';
import Category from '../../components/category';
import Buttons from '../../components/buttons'

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<Category />
				<Tabs />
				<div class={style.tabContainer}></div>
				<div class={style.buttonsContainer}>
					<Buttons />
				</div>
			</div>
		);
	}
}
